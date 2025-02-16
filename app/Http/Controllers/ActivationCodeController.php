<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ActivationCode;
use Illuminate\Support\Str; // make sure to import Str

class ActivationCodeController extends Controller
{
    /**
     * Display a listing of the activation codes.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $activationCodes = ActivationCode::where('member_activated', false)->get();

        return Inertia::render('ActivationCode', [
            'activationCodes' => $activationCodes,
        ]);
    }

    /**
     * Deactivate current activation codes and generate a new set.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function generate(Request $request)
    {
        // Deactivate all current active activation codes.
        // ActivationCode::where('active', true)->update(['active' => false]);

        // Generate 10 new activation codes.
        for ($i = 0; $i < 10; $i++) {
            ActivationCode::create([
                'code' => strtoupper(Str::random(10)), // generates a random 10-character string
                'security_code' => strtoupper(Str::random(10)),
                'active' => true,
                'created_by' => $request->user()->id, // using the currently logged in user
            ]);
        }

        return redirect()->route('activation-codes')
            ->with('success', 'New activation codes generated.');
    }
}
