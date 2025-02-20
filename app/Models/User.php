<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $guarded = [];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_admin' => 'boolean',
        ];
    }

    public function sponsor()
    {
        return $this->belongsTo(User::class, 'sponsor_id');
    }

    public function activationCodeRecord()
    {
        return $this->hasOne(ActivationCode::class, 'code', 'code_used');
    }

    public function referrals()
    {
        return $this->hasMany(User::class, 'sponsor_id');
    }

    /**
     * Calculate the net ZCoins for this user.
     *
     * The calculation is based on:
     *  - Direct Referral Bonus: For each direct referral, the user earns a bonus (from system settings).
     *  - Duplication Bonus: For each level‑2 referral (i.e. the referrals of the direct referrals), the user earns a bonus.
     *  - Membership Fee: A fixed fee of 500 PHP is converted to ZCoins using the conversion rate, then subtracted.
     *
     * @return float The net ZCoins.
     */
    public function calculateZCoins(): float
    {
        // Get the system settings (assumes a single record exists)
        $settings = \App\Models\SystemSetting::getSettings();

        // Get the bonus rates from system settings.
        $directBonusRate = $settings->direct_referral_bonus_zcoins; // e.g. 1.6667
        $duplicationBonusLevel2 = $settings->duplication_bonus_level_2; // e.g. 0.8333

        // Count direct referrals.
        $directCount = $this->referrals()->count();
        $directBonus = $directCount * $directBonusRate;

        // Count indirect (level 2) referrals.
        // We can loop over direct referrals and sum up their referral counts.
        $indirectCount = 0;
        foreach ($this->referrals as $directReferral) {
            $indirectCount += $directReferral->referrals()->count();
        }
        $duplicationBonus = $indirectCount * $duplicationBonusLevel2;

        // Membership fee in ZCoins:
        // For example, if membership fee is 500 PHP and 1 ZCoin = 60 PHP, then fee in ZCoins = 500 / 60.
        $membershipFeeZCoins = 500 / $settings->zcoins_value_to_php;

        // Total ZCoins earned:
        $totalZCoins = $directBonus + $duplicationBonus;

        // Net ZCoins is total minus membership fee.
        return $totalZCoins - $membershipFeeZCoins;
    }

}