<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class ActivationCodeHistoryController extends Controller
{
    /**
     * Display the activation codes history.
     */
    public function index(): Response
    {
        // Retrieve all users that have used an activation code,
        // eager load the activation code record and sponsor.
        $users = User::whereNotNull('code_used')
            ->with(['activationCodeRecord', 'sponsor'])
            ->orderBy('created_at', 'desc')
            ->get();

        // Transform data for the table.
        $history = $users->map(function ($user) {
            return [
                'id'             => $user->id,
                'user_name'      => $user->first_name . ' ' . $user->last_name,
                'code_used'      => $user->code_used,
                'security_code'  => $user->activationCodeRecord ? $user->activationCodeRecord->security_code : null,
                'used_at'        => $user->created_at->format('F j, Y'),
                'sponsor'        => $user->sponsor 
                                    ? $user->sponsor->first_name . ' ' . $user->sponsor->last_name 
                                    : '—',
            ];
        });

        return Inertia::render('ActivationCodesHistory', [
            'history' => $history,
        ]);
    }
}
