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
            // General Settings (decimals)
            'zcoins_value_to_php' => 'required|numeric',
            'default_currency' => 'required|string|max:3',
            'membership_fee_php' => 'required|numeric',

            // Referral Settings (decimals)
            'direct_referral_bonus_php' => 'required|numeric',
            'buy_zcoins_interest_percent' => 'required|numeric',
            'buy_zcoins_daily_interest_for_late_payment_percent' => 'required|numeric',
            'deduction_for_processing_fee_php' => 'required|numeric',

            // Lock Direct Referral Counts (integers)
            'lock_20_zcoins_unlock_count' => 'required|integer',
            'lock_60_zcoins_unlock_count' => 'required|integer',
            'lock_100_zcoins_unlock_count' => 'required|integer',
            'lock_200_zcoins_unlock_count' => 'required|integer',
            'lock_400_zcoins_unlock_count' => 'required|integer',
            'lock_1000_zcoins_unlock_count' => 'required|integer',

            // Selling & Deductions (decimals)
            'sell_zcoins_charge_percent' => 'required|numeric',
            'deduction_for_zcare_php' => 'required|numeric',
            'rebates_cashback_percent' => 'required|numeric',

            // Duplication Bonus (decimals for 12 levels)
            'duplication_bonus_level_1' => 'required|numeric',
            'duplication_bonus_level_2' => 'required|numeric',
            'duplication_bonus_level_3' => 'required|numeric',
            'duplication_bonus_level_4' => 'required|numeric',
            'duplication_bonus_level_5' => 'required|numeric',
            'duplication_bonus_level_6' => 'required|numeric',
            'duplication_bonus_level_7' => 'required|numeric',
            'duplication_bonus_level_8' => 'required|numeric',
            'duplication_bonus_level_9' => 'required|numeric',
            'duplication_bonus_level_10' => 'required|numeric',
            'duplication_bonus_level_11' => 'required|numeric',
            'duplication_bonus_level_12' => 'required|numeric',

            // Incentives (strings for 12 levels)
            'incentives_percent_level_1' => 'required|string',
            'incentives_percent_level_2' => 'required|string',
            'incentives_percent_level_3' => 'required|string',
            'incentives_percent_level_4' => 'required|string',
            'incentives_percent_level_5' => 'required|string',
            'incentives_percent_level_6' => 'required|string',
            'incentives_percent_level_7' => 'required|string',
            'incentives_percent_level_8' => 'required|string',
            'incentives_percent_level_9' => 'required|string',
            'incentives_percent_level_10' => 'required|string',
            'incentives_percent_level_11' => 'required|string',
            'incentives_percent_level_12' => 'required|string',

            // Patronage Bonus (decimals for 12 levels)
            'patronage_bonus_level_1' => 'required|numeric',
            'patronage_bonus_level_2' => 'required|numeric',
            'patronage_bonus_level_3' => 'required|numeric',
            'patronage_bonus_level_4' => 'required|numeric',
            'patronage_bonus_level_5' => 'required|numeric',
            'patronage_bonus_level_6' => 'required|numeric',
            'patronage_bonus_level_7' => 'required|numeric',
            'patronage_bonus_level_8' => 'required|numeric',
            'patronage_bonus_level_9' => 'required|numeric',
            'patronage_bonus_level_10' => 'required|numeric',
            'patronage_bonus_level_11' => 'required|numeric',
            'patronage_bonus_level_12' => 'required|numeric',
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
