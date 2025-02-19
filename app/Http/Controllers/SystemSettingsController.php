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
            'direct_referral_bonus_zcoins' => 'required|integer',
            'buy_zcoins_interest_percent' => 'required|integer',
            'buy_zcoins_daily_interest_for_late_payment_percent' => 'required|integer',
            'deduction_for_processing_fee_php' => 'required|integer',
            'lock_20_zcoins_unlock_count' => 'required|integer',
            'lock_60_zcoins_unlock_count' => 'required|integer',
            'lock_100_zcoins_unlock_count' => 'required|integer',
            'lock_200_zcoins_unlock_count' => 'required|integer',
            'lock_400_zcoins_unlock_count' => 'required|integer',
            'lock_1000_zcoins_unlock_count' => 'required|integer',
            'sell_zcoins_charge_percent' => 'required|integer',
            'deduction_for_zcare_php' => 'required|integer',
            'rebates_cashback_percent' => 'required|integer',
            // Validate duplication bonus levels
            'duplication_bonus_level_1' => 'required|integer',
            'duplication_bonus_level_2' => 'required|integer',
            'duplication_bonus_level_3' => 'required|integer',
            'duplication_bonus_level_4' => 'required|integer',
            'duplication_bonus_level_5' => 'required|integer',
            'duplication_bonus_level_6' => 'required|integer',
            'duplication_bonus_level_7' => 'required|integer',
            'duplication_bonus_level_8' => 'required|integer',
            'duplication_bonus_level_9' => 'required|integer',
            'duplication_bonus_level_10' => 'required|integer',
            'duplication_bonus_level_11' => 'required|integer',
            'duplication_bonus_level_12' => 'required|integer',
            // Validate incentives percentages
            'incentives_percent_level_1' => 'required|integer',
            'incentives_percent_level_2' => 'required|integer',
            'incentives_percent_level_3' => 'required|integer',
            'incentives_percent_level_4' => 'required|integer',
            'incentives_percent_level_5' => 'required|integer',
            'incentives_percent_level_6' => 'required|integer',
            'incentives_percent_level_7' => 'required|integer',
            'incentives_percent_level_8' => 'required|integer',
            'incentives_percent_level_9' => 'required|integer',
            'incentives_percent_level_10' => 'required|integer',
            'incentives_percent_level_11' => 'required|integer',
            'incentives_percent_level_12' => 'required|integer',
            // Validate patronage bonus levels
            'patronage_bonus_level_1' => 'required|integer',
            'patronage_bonus_level_2' => 'required|integer',
            'patronage_bonus_level_3' => 'required|integer',
            'patronage_bonus_level_4' => 'required|integer',
            'patronage_bonus_level_5' => 'required|integer',
            'patronage_bonus_level_6' => 'required|integer',
            'patronage_bonus_level_7' => 'required|integer',
            'patronage_bonus_level_8' => 'required|integer',
            'patronage_bonus_level_9' => 'required|integer',
            'patronage_bonus_level_10' => 'required|integer',
            'patronage_bonus_level_11' => 'required|integer',
            'patronage_bonus_level_12' => 'required|integer',
        ]);

        // Get the settings record or create one if not exist.
        $settings = SystemSetting::first();
        if (!$settings) {
            SystemSetting::create($validated);
        } else {
            $settings->update($validated);
        }

        return back()->with('success', 'Settings updated successfully.');
    }
}
