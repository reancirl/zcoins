<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;

class DownlineController extends Controller
{
    /**
     * Display the downlines for the logged‐in user.
     *
     * @return Response
     */
    public function index()
    {
        // Get the current authenticated user.
        $user = auth()->user();

        // Retrieve all downline users recursively.
        $downlines = $user->getAllDownlines();

        // Map each downline to include sponsor name (or "You" if sponsor is the current user).
        $mappedDownlines = $downlines->map(function ($member) use ($user) {
            return [
                'id' => $member->id,
                'first_name' => $member->first_name,
                'last_name' => $member->last_name,
                'email' => $member->email,
                'sponsor' => $member->sponsor && $member->sponsor->id === $user->id
                    ? 'You'
                    : ($member->sponsor
                        ? $member->sponsor->first_name . ' ' . $member->sponsor->last_name
                        : null),
            ];
        });

        // Group the downlines by the 'sponsor' field.
        $groupedDownlines = $mappedDownlines->groupBy('sponsor');

        // Sort the groups so that the group with key "You" appears first.
        $sortedGroups = $groupedDownlines->sortByDesc(function ($group, $key) {
            return $key === 'You' ? 1 : 0;
        });

        return Inertia::render('Downlines', [
            'downlines' => $sortedGroups,
        ]);
    }

    public function genealogy(): Response
    {
        $user = auth()->user();
        // Build the genealogy tree for the current user.
        $genealogy = $user->toGenealogyArray();
        return Inertia::render('Genealogy', [
            'genealogy' => $genealogy,
        ]);
    }
}
