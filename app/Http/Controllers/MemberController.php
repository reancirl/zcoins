<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function index(Request $request)
    {
        // Retrieve all non-admin users, including their sponsor relationship.
        $members = User::where('is_admin', false)
            ->with('sponsor')
            ->orderBy('id', 'desc')
            ->get()
            ->map(function ($member) {
                return [
                    'id' => $member->id,
                    'first_name' => $member->first_name,
                    'last_name' => $member->last_name,
                    'email' => $member->email,
                    // If a sponsor exists, return their full name; otherwise, null.
                    'sponsor' => $member->sponsor
                        ? $member->sponsor->first_name . ' ' . $member->sponsor->last_name
                        : null,
                ];
            });

        return Inertia::render('Members', [
            'members' => $members,
        ]);
    }
}
