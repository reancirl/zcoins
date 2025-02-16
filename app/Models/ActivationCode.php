<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActivationCode extends Model
{
    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'code', 
        'security_code', 
        'created_by', 
    ];

    protected $dates = [
        'created_at', 
        'updated_at', 
    ];
}
