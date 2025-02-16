<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Support\Str;
use App\Models\ActivationCode;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create the admin user if it doesn't exist.
        $admin = User::firstOrCreate(
            ['email' => 'admin@admin.com'],
            [
                'is_admin'   => true,
                'official_member'   => true,
                'first_name' => 'Admin',
                'last_name'  => 'User',
                'password'   => Hash::make('password'),
            ]
        );

        User::firstOrCreate(
            ['email' => 'lumax@admin.com'],
            [
                'is_admin'   => true,
                'official_member'   => true,
                'first_name' => 'Lumax',
                'last_name'  => 'User',
                'password'   => Hash::make('password'),
            ]
        );

        $this->command->info('Admin user created successfully.');

        // Create 10 activation codes for the admin user.
        for ($i = 0; $i < 10; $i++) {
            ActivationCode::create([
                'code'       => Str::upper(Str::random(10)),
                'security_code'       => Str::upper(Str::random(10)),
                'created_by' => $admin->id, // Should be 1 if admin is the first user.
                'active'     => true, // Optional since the default is true.
            ]);
        }

        $this->command->info('10 Activation codes created successfully.');
    }
}
