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

    protected $appends = ['net_zcoins'];

    /**
     * Accessor to compute and return the user's net ZCoins.
     *
     * @return float
     */
    public function getNetZcoinsAttribute(): float
    {
        return $this->calculateNetZCoins();
    }

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
        return $this->hasMany(self::class, 'sponsor_id');
    }

    /**
     * Calculate the total (net) ZCoins for this user.
     *
     * Total ZCoins = Base (membership fee converted to ZCoins)
     *               + Bonus from referrals (levels 1 to 12)
     *
     * @return float Total ZCoins for the user.
     */
    public function calculateNetZCoins(): float
    {
        $settings = \App\Models\SystemSetting::getSettings();
        $conversionRate = $settings->zcoins_value_to_php; // e.g. 60 PHP per ZCoin

        // Base ZCoins from membership fee
        $baseZCoins = $settings->membership_fee_php / $conversionRate;

        // Compute total bonus from referrals from level 1 through level 12.
        $bonus = $this->computeReferralBonus(1, 12, $settings, $conversionRate);

        return $baseZCoins + $bonus;
    }

    /**
     * Recursively compute the referral bonus from the given level to the maximum level.
     *
     * @param int $currentLevel The current referral level (starting at 1).
     * @param int $maxLevel The maximum referral level to consider.
     * @param \App\Models\SystemSetting $settings The system settings.
     * @param float $conversionRate The conversion rate (PHP per ZCoin).
     * @return float The total bonus (in ZCoins) from referrals at this level and below.
     */
    protected function computeReferralBonus(int $currentLevel, int $maxLevel, $settings, float $conversionRate): float
    {
        if ($currentLevel > $maxLevel) {
            return 0;
        }

        $bonus = 0;
        $field = 'duplication_bonus_level_' . $currentLevel;
        foreach ($this->referrals as $referral) {
            // Add bonus for this referral at the current level.
            $bonus += $settings->$field / $conversionRate;
            // Recursively add bonus from this referral's downline (next level).
            $bonus += $referral->computeReferralBonus($currentLevel + 1, $maxLevel, $settings, $conversionRate);
        }
        return $bonus;
    }
}