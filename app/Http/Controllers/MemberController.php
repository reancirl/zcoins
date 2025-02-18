<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class MemberController extends Controller
{
    public function index(Request $request)
    {
        // Query for non-admin, official members.
        $members = User::where('is_admin', false)
            ->get();

        return \Inertia\Inertia::render('Members', [
            'members' => $members,
        ]);
    }

}
