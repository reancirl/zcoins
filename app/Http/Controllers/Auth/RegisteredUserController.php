<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\ActivationCode;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Mail;
use App\Mail\RegistrationSuccessful;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        // Validate incoming data; note that 'country' has been removed.
        $request->validate([
            'username' => 'required|string|max:255|unique:users,username',
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'mobile_number' => 'nullable|string|max:255',
            'activation_code' => 'required|string|max:255',
            'security_code' => 'required|string|max:255',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'address' => 'nullable|string|max:255',
            'address2' => 'nullable|string|max:255',
            'province' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'zipcode' => 'nullable|string|max:255',
            'bank_name' => 'nullable|string|max:255',
            'account_name' => 'nullable|string|max:255',
            'account_number' => 'nullable|string|max:255',
            'sponsor_id' => 'nullable|string|exists:users,member_id',
        ]);

        // Verify that both the activation code and security code match a record.
        $activationCode = ActivationCode::where('code', $request->activation_code)
            ->where('security_code', $request->security_code)
            ->where('active', 1)
            ->first();

        if (!$activationCode) {
            return back()
                ->withErrors([
                    'activation_code' => 'Invalid activation code or security code provided.',
                ])
                ->withInput();
        }

        // Lookup the sponsor if provided, using the sponsor's member_id.
        $sponsorId = null;
        if ($request->sponsor_id) {
            $sponsorUser = User::where('member_id', $request->sponsor_id)->first();
            if ($sponsorUser) {
                $sponsorId = $sponsorUser->id;
            }
        }

        // Create the user, including sponsor_id if provided.
        $user = User::create([
            'username' => $request->username,
            'first_name' => $request->first_name,
            'middle_name' => $request->middle_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'mobile_number' => $request->mobile_number,
            'password' => Hash::make($request->password),
            'code_used' => $request->activation_code,
            'address' => $request->address,
            'address2' => $request->address2,
            'province' => $request->province,
            'city' => $request->city,
            'zipcode' => $request->zipcode,
            'bank_name' => $request->bank_name,
            'account_name' => $request->account_name,
            'account_number' => $request->account_number,
            'sponsor_id' => $sponsorId,
        ]);

        // Generate the member_id by subtracting 1 from the user's id, then padding with zeros to 4 digits.
        $user->member_id = sprintf('%04d', $user->id - 1);
        $user->save();

        // Mark the activation code as used.
        $activationCode->active = 0;
        $activationCode->save();

        event(new Registered($user));
        Auth::login($user);

        // Send a confirmation email after successful registration.
        Mail::to($user->email)->send(new RegistrationSuccessful($user));

        return redirect(route('dashboard', absolute: false));
    }
}
