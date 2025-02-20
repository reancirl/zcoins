<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
      public function up(): void
      {
            Schema::create('system_settings', function (Blueprint $table) {
                  $table->id();
                  $table->decimal('zcoins_value_to_php', 10, 2)->default(60)
                        ->comment('Conversion rate: PHP per 1 Zcoin');
                  $table->string('default_currency', 3)->default('PHP')
                        ->comment('The default currency code');
                  // Payment for membership fee (in PHP)
                  $table->decimal('membership_fee_php', 10, 2)->default(500)
                        ->comment('Membership fee in PHP');

                  // Referral Settings
                  $table->decimal('direct_referral_bonus_zcoins', 10, 2)->default(1.6667)
                        ->comment('Direct Referral Bonus in PHP'); // changed to PHP
                  $table->decimal('buy_zcoins_interest_percent', 10, 2)->default(20)
                        ->comment('Buy ZCoins Interest in Percentage');
                  $table->decimal('buy_zcoins_daily_interest_for_late_payment_percent', 10, 2)->default(0.5)
                        ->comment('Daily Interest for Late Payment in Percentage');
                  $table->decimal('deduction_for_processing_fee_php', 10, 2)->default(50)
                        ->comment('Deduction for Processing Fee in PHP');

                  // Lock Direct Referral Counts (these remain integers)
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
                  $table->decimal('sell_zcoins_charge_percent', 10, 2)->default(2)
                        ->comment('Charge for Selling ZCoins in Percentage');
                  $table->decimal('deduction_for_zcare_php', 10, 2)->default(30)
                        ->comment('Deduction for ZCare in PHP');
                  $table->decimal('rebates_cashback_percent', 10, 2)->default(2)
                        ->comment('Rebates/Cashback in Percentage');

                  // Duplication Bonus (Indirect Referral Bonus) in ZCoins for 12 levels (changed to PHP)
                  for ($i = 1; $i <= 12; $i++) {
                        $table->decimal("duplication_bonus_level_{$i}", 10, 2)->default(0)
                              ->comment("Duplication Bonus in PHP for level {$i}");
                  }

                  // Incentives in Percentage for 12 levels – changed to string
                  for ($i = 1; $i <= 12; $i++) {
                        $table->string("incentives_percent_level_{$i}", 50)->default('0')
                              ->comment("Incentives for level {$i} (could be percentage or gift description)");
                  }

                  // Patronage Bonus in ZCoins for 12 levels – changed to percentage
                  for ($i = 1; $i <= 12; $i++) {
                        $table->decimal("patronage_bonus_level_{$i}", 10, 2)->default(0)
                              ->comment("Patronage Bonus in Percentage for level {$i}");
                  }

                  $table->timestamps();
            });
      }

      public function down(): void
      {
            Schema::dropIfExists('system_settings');
      }
};
