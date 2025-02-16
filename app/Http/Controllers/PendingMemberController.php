<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\ActivationCode;

class PendingMemberController extends Controller
{
    /**
     * Display a listing of pending members.
     *
     * Pending members are defined as non‑admin users who have no parent_id
     * and are not yet marked as official members.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $pendingUsers = User::where('is_admin', false)
            ->whereNull('parent_id')
            ->where('official_member', false)
            ->get();

        $officialMembers = User::where('official_member', true)
                               ->where('id','!=',1)
                               ->get(['id', 'first_name', 'last_name']);

        return \Inertia\Inertia::render('PendingMembers', [
            'pendingUsers'    => $pendingUsers,
            'officialMembers' => $officialMembers,
        ]);
    }

    /**
     * Update a pending member with the security code and assign the parent.
     * Also mark the user as an official member.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id  The pending user's ID.
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $id)
    {
        // Validate the request and capture the validated fields.
        $validated = $request->validate([
            'security_code' => 'required|string|max:255',
            'parent_id' => 'required|exists:users,id',
        ]);

        // Retrieve the pending user.
        $user = User::findOrFail($id);

        // Ensure the user is pending (non-admin, has no parent, and is not yet an official member).
        if ($user->is_admin || $user->parent_id !== null || $user->official_member) {
            return redirect()->back()->withErrors(['error' => 'User is not pending.']);
        }

        // Attempt to find an activation code that matches the code used during registration,
        // has the provided security code, and hasn't yet been used to activate a member.
        $activationCode = ActivationCode::where('code', $user->code_used)
            ->where('security_code', $validated['security_code'])
            ->where('member_activated', false)
            ->first();

        if (!$activationCode) {
            return redirect()->back()->withErrors([
                'security_code' => 'Invalid security code provided or it does not match the registration code.'
            ]);
        }

        // Use a database transaction to ensure both updates succeed together.
        \DB::transaction(function () use ($activationCode, $user, $validated) {
            // Mark the activation code as having been used to activate a member.
            // This updates the 'member_activated' column (default 0) to true.
            $activationCode->member_activated = true;
            $activationCode->save();

            // Update the user: assign the parent_id and mark as an official member.
            $user->update([
                'parent_id' => $validated['parent_id'],
                'official_member' => true,
            ]);
        });

        return redirect()->back()->with('success', 'Member approved, parent assigned, and marked as official.');
    }
}
