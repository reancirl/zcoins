<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('system_settings', function (Blueprint $table) {
            $table->id();
            $table->integer('zcoins_value_to_php')->default(60)
                ->comment('Conversion rate: PHP per 1 Zcoin');
            $table->string('default_currency', 3)->default('PHP')
                ->comment('The default currency code');
            // Referral Settings
            $table->integer('direct_referral_bonus_zcoins')->default(5)
                ->comment('Direct Referral Bonus in ZCoins');
            $table->integer('buy_zcoins_interest_percent')->default(3)
                ->comment('Buy ZCoins Interest in Percentage');
            $table->integer('buy_zcoins_daily_interest_for_late_payment_percent')->default(0)
                ->comment('Daily Interest for Late Payment in Percentage');
            $table->integer('deduction_for_processing_fee_php')->default(0)
                ->comment('Deduction for Processing Fee in PHP');
            // Lock Direct Referral Counts
            $table->integer('lock_20_zcoins_unlock_count')->default(3)
                ->comment('Unlock count for 20 ZCoins Lock (Minimum sell)');
            $table->integer('lock_60_zcoins_unlock_count')->default(10)
                ->comment('Unlock count for 60 ZCoins Lock');
            $table->integer('lock_100_zcoins_unlock_count')->default(15)
                ->comment('Unlock count for 100 ZCoins Lock');
            $table->integer('lock_200_zcoins_unlock_count')->default(15)
                ->comment('Unlock count for 200 ZCoins Lock');
            $table->integer('lock_400_zcoins_unlock_count')->default(125)
                ->comment('Unlock count for 400 ZCoins Lock');
            $table->integer('lock_1000_zcoins_unlock_count')->default(200)
                ->comment('Unlock count for 1000 ZCoins Lock');
            // Selling & Deductions
            $table->integer('sell_zcoins_charge_percent')->default(2)
                ->comment('Charge for Selling ZCoins in Percentage');
            $table->integer('deduction_for_zcare_php')->default(30)
                ->comment('Deduction for ZCare in PHP');
            $table->integer('rebates_cashback_percent')->default(2)
                ->comment('Rebates/Cashback in Percentage');
            // Duplication Bonus (Indirect Referral Bonus) in ZCoins for 12 levels
            for ($i = 1; $i <= 12; $i++) {
                $table->integer("duplication_bonus_level_{$i}")->default(0)
                    ->comment("Duplication Bonus in ZCoins for level {$i}");
            }
            // Incentives in Percentage for 12 levels
            for ($i = 1; $i <= 12; $i++) {
                $table->integer("incentives_percent_level_{$i}")->default(0)
                    ->comment("Incentives in Percentage for level {$i}");
            }
            // Patronage Bonus in ZCoins for 12 levels
            for ($i = 1; $i <= 12; $i++) {
                $table->integer("patronage_bonus_level_{$i}")->default(0)
                    ->comment("Patronage Bonus in ZCoins for level {$i}");
            }
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('system_settings');
    }
};
