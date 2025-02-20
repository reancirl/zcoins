<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SystemSetting;

class SystemSettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SystemSetting::updateOrCreate(
            ['id' => 1],
            [
                // General Settings
                'zcoins_value_to_php' => 60,
                'default_currency' => 'PHP',
                'membership_fee_php' => 500,

                // Referral Settings
                'direct_referral_bonus_php' => 100,
                'buy_zcoins_interest_percent' => 20,
                'buy_zcoins_daily_interest_for_late_payment_percent' => 0.5,
                'deduction_for_processing_fee_php' => 50,

                // Lock Direct Referral Counts
                'lock_20_zcoins_unlock_count' => 3,
                'lock_60_zcoins_unlock_count' => 10,
                'lock_100_zcoins_unlock_count' => 15,
                'lock_200_zcoins_unlock_count' => 15,
                'lock_400_zcoins_unlock_count' => 125,
                'lock_1000_zcoins_unlock_count' => 200,

                // Selling & Deductions
                'sell_zcoins_charge_percent' => 2,
                'deduction_for_zcare_php' => 30,
                'rebates_cashback_percent' => 2,

                // Duplication Bonus (Indirect Referral Bonus) in PHP for 12 levels
                'duplication_bonus_level_1' => 100,
                'duplication_bonus_level_2' => 50,
                'duplication_bonus_level_3' => 20,
                'duplication_bonus_level_4' => 20,
                'duplication_bonus_level_5' => 10,
                'duplication_bonus_level_6' => 10,
                'duplication_bonus_level_7' => 5,
                'duplication_bonus_level_8' => 5,
                'duplication_bonus_level_9' => 5,
                'duplication_bonus_level_10' => 5,
                'duplication_bonus_level_11' => 5,
                'duplication_bonus_level_12' => 5,

                // Incentives in Percentage for 12 levels (as strings)
                'incentives_percent_level_1' => 'Not Indicated',
                'incentives_percent_level_2' => 'Not Indicated',
                'incentives_percent_level_3' => 'Not Indicated',
                'incentives_percent_level_4' => 'Not Indicated',
                'incentives_percent_level_5' => 'Not Indicated',
                'incentives_percent_level_6' => 'Not Indicated',
                'incentives_percent_level_7' => 'Not Indicated',
                'incentives_percent_level_8' => 'Not Indicated',
                'incentives_percent_level_9' => 'Not Indicated',
                'incentives_percent_level_10' => 'Not Indicated',
                'incentives_percent_level_11' => 'Not Indicated',
                'incentives_percent_level_12' => 'Not Indicated',

                // Patronage Bonus in ZCoins for 12 levels (as decimals representing percentages)
                'patronage_bonus_level_1' => 1,
                'patronage_bonus_level_2' => 1,
                'patronage_bonus_level_3' => 1,
                'patronage_bonus_level_4' => 1,
                'patronage_bonus_level_5' => 1,
                'patronage_bonus_level_6' => 1,
                'patronage_bonus_level_7' => 1,
                'patronage_bonus_level_8' => 1,
                'patronage_bonus_level_9' => 0,
                'patronage_bonus_level_10' => 0,
                'patronage_bonus_level_11' => 0,
                'patronage_bonus_level_12' => 0,
            ]
        );

    }
}