<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\SystemSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        // Build the base query for transactions.
        $query = Transaction::query();

        // Date filter: if a 'date' parameter is provided, filter by that date.
        // Alternatively, if a 'today' parameter is present, filter by today.
        if ($request->filled('date')) {
            $query->whereDate('created_at', $request->date);
        } elseif ($request->has('today')) {
            $query->whereDate('created_at', now()->toDateString());
        }

        // Admins can see all transactions and optionally filter by a specific user.
        // Members can only see their own transactions.
        if ($user->is_admin) {
            if ($request->filled('user_id')) {
                $query->where('member_id', $request->user_id);
            }
        } else {
            $query->where('user_id', $user->id);
        }

        // Eager load the related user for each transaction.
        $query->with('user');

        // Order by most recent.
        $transactions = $query->orderBy('created_at', 'desc')->get()->map(function ($transaction) {
            return [
                'id' => $transaction->id,
                'transaction_reference' => $transaction->transaction_reference,
                'type' => $transaction->type,
                'requested_at' => \Carbon\Carbon::parse($transaction->requested_at)->format('F j, Y'),
                'status' => $transaction->status,
                'amount_in_zcoins' => $transaction->amount_in_zcoins,
                'conversion_rate' => $transaction->conversion_rate,
                'remarks' => $transaction->remarks,
                'created_at' => $transaction->created_at->toDateTimeString(),
                'paid' => $transaction->paid,
                // Include basic user info.
                'user' => $transaction->user ? [
                    'member_id' => $transaction->user->member_id,
                    'first_name' => $transaction->user->first_name,
                    'last_name' => $transaction->user->last_name,
                    'email' => $transaction->user->email,
                ] : null,
            ];
        });

        // Render the Transaction.tsx page via Inertia, passing the transactions data.
        return Inertia::render('Transaction', [
            'transactions' => $transactions,
        ]);
    }

    /**
     * Process a sell Zcoins request.
     */
    public function sellZcoins(Request $request)
    {
        $user = Auth::user();

        // Validate the sell amount: must be numeric and at least 20 Zcoins.
        $request->validate([
            'amount' => 'required|numeric|min:20',
        ]);

        $sellAmount = $request->amount;

        // Check if the user has enough Zcoins using the appended 'net_zcoins' attribute.
        if ($sellAmount > $user->net_zcoins) {
            return back()->withErrors([
                'amount' => 'Insufficient Zcoins available to sell.',
            ])->withInput();
        }

        Transaction::create([
            'type' => 'sell',
            'user_id' => $user->id,
            'amount_in_zcoins' => $sellAmount,
            'conversion_rate' => 60, // Adjust or fetch dynamically as needed.
            'status' => 'pending',
            'requested_at' => now(),
            // Generate a unique transaction reference.
            'transaction_reference' => strtoupper(uniqid('TXN-')),
        ]);

        // Optionally, trigger events or additional processing here.

        return back()->with('success', 'Sell request submitted successfully.');
    }

    public function buyZcoins(Request $request)
    {
        $user = Auth::user();

        // Validate the requested amount is numeric and at least 20.
        $request->validate([
            'amount' => 'required|numeric|min:20',
        ]);

        $amount = $request->amount;

        // Check for an existing borrow request that is approved (success) but not paid.
        $existingBorrow = Transaction::where('user_id', $user->id)
            ->where('type', 'buy')
            ->where('status', 'success')
            ->where('paid', false) // Assumes a boolean 'paid' column in transactions.
            ->exists();

        if ($existingBorrow) {
            return back()->withErrors([
                'amount' => 'You already have an approved borrow request that is not yet paid.',
            ]);
        }

        // Retrieve system settings (assumes one settings row exists).
        $settings = SystemSetting::first();
        if (!$settings) {
            return back()->withErrors(['system' => 'System settings not configured.']);
        }

        // Determine the required number of direct referrals based on the requested amount.
        if ($amount < 60) {
            $requiredReferrals = $settings->lock_20_zcoins_unlock_count;
        } elseif ($amount < 100) {
            $requiredReferrals = $settings->lock_60_zcoins_unlock_count;
        } elseif ($amount < 200) {
            $requiredReferrals = $settings->lock_100_zcoins_unlock_count;
        } elseif ($amount < 400) {
            $requiredReferrals = $settings->lock_200_zcoins_unlock_count;
        } elseif ($amount < 1000) {
            $requiredReferrals = $settings->lock_400_zcoins_unlock_count;
        } else {
            $requiredReferrals = $settings->lock_1000_zcoins_unlock_count;
        }

        // Check if the user has enough direct referrals.
        $directReferralsCount = $user->referrals()->count();
        if ($directReferralsCount < $requiredReferrals) {
            return back()->withErrors([
                'amount' => "You need at least {$requiredReferrals} direct referrals to borrow {$amount} Zcoins."
            ]);
        }

        // Create a new borrow transaction.
        Transaction::create([
            'type' => 'buy',
            'user_id' => $user->id,
            'amount_in_zcoins' => $amount,
            'conversion_rate' => $settings->zcoins_value_to_php, // conversion rate from system settings
            'status' => 'pending',
            'requested_at' => now(),
            'transaction_reference' => strtoupper(uniqid('TXN-')),
            // Optionally, you might set 'paid' to false explicitly.
            'paid' => false,
        ]);

        // Optionally, trigger events or additional processing here.

        return back()->with('success', 'Borrow request submitted successfully.');
    }

    public function edit(Transaction $transaction)
    {
        $transaction->load('user');
        return Inertia::render('EditTransaction', [
            'transaction' => $transaction
        ]);
    }


    public function update(Request $request, Transaction $transaction)
    {
        $data = $request->validate([
            'status' => 'required|in:pending,under_review,rejected,success',
            'remarks' => 'nullable|string',
            'paid' => 'required|boolean',
        ]);

        $transaction->update($data);
        $transaction->processed_at = now();

        return redirect()->route('transactions')
            ->with('success', 'Transaction updated successfully.');
    }

}
