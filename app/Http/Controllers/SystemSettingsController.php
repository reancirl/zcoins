<?php

namespace App\Http\Controllers;

use App\Models\SystemSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SystemSettingsController extends Controller
{
    /**
     * Display the system settings page.
     */
    public function index(): Response
    {
        $settings = SystemSetting::getSettings();

        return Inertia::render('SystemSettings', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update the system settings.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'zcoins_value_to_php' => 'required|integer',
            'default_currency'    => 'required|string|size:3',
        ]);

        // Get the single settings record or create one if none exists.
        $settings = SystemSetting::first();
        if (!$settings) {
            SystemSetting::create($validated);
        } else {
            $settings->update($validated);
        }

        return back()->with('success', 'Settings updated successfully.');
    }
}
