<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $query = User::where('is_admin', false);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%");
            });
        }

        $members = $query->with('sponsor')
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->appends($request->only('search'))
            ->through(function ($member) {
                return [
                    'member_id' => $member->member_id,
                    'first_name' => $member->first_name,
                    'last_name' => $member->last_name,
                    'email' => $member->email,
                    'sponsor' => $member->sponsor
                        ? $member->sponsor->first_name . ' ' . $member->sponsor->last_name
                        : null,
                ];
            });

        return Inertia::render('Members', [
            'members' => $members,
            'filters' => $request->only('search'),
        ]);
    }
    
    public function archive(Request $request, $memberId)
    {
        $request->validate([
            'reason' => 'required|string|max:255',
        ]);

        $member = User::findOrFail($memberId);
        // Example: Set an "archived" flag and save the reason.
        $member->update([
            'is_archived' => true,
            'archived_reason' => $request->input('reason'),
            'archived_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Member archived successfully.');
    }

}
