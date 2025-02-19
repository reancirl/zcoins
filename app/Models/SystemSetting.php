<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SystemSetting extends Model
{
    protected $guarded = [];

    /**
     * Retrieve the global system settings.
     * Assumes only one record exists.
     */
    public static function getSettings(): self
    {
        return static::first() ?? new static();
    }
}
