<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MemberLoginController extends Controller
{
    /**
     * Display the member login page.
     */
    public function index(Request $request)
    {
        return inertia('MemberLogin', [
            'status' => session('status'),
            'canResetPassword' => true,
        ]);
    }

    /**
     * Handle the member login request.
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'login' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        $login = $credentials['login'];
        $fieldType = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

        // Ensure only non-admin users can log in by requiring is_admin to be false.
        if (
            Auth::attempt([
                $fieldType => $login,
                'password' => $credentials['password'],
                'is_admin' => false,
            ])
        ) {
            $request->session()->regenerate();
            return redirect()->intended('/dashboard');
        }

        return back()->withErrors([
            'login' => 'The provided credentials do not match our records or are not valid for member login.',
        ])->onlyInput('login');
    }
}
