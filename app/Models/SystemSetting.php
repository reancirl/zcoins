<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SystemSetting extends Model
{
    protected $guarded = [];
    public static function getZcoinConversionRate(): int
    {
        return (int) static::first()->zcoins_value_to_php;
    }
}
