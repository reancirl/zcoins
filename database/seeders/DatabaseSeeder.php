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
                'is_admin' => true,
                'username' => 'admin',
                'member_id' => '0000',
                'first_name' => 'Admin',
                'last_name' => 'User',
                'password' => Hash::make('password1'),
            ]
        );

        User::firstOrCreate(
            ['email' => 'luyaomacartin@gmail.com'],
            [
                'is_admin' => true,
                'username' => 'lumax', // Added username
                'first_name' => 'Lumax',
                'last_name' => 'User',
                'sponsor_id' => 1,
                'member_id' => '0001',
                'password' => Hash::make('password'),
            ]
        );

        $this->command->info('Admin user created successfully.');

        // Create 10 activation codes for the admin user.
        for ($i = 0; $i < 10; $i++) {
            ActivationCode::create([
                'code' => Str::upper(Str::random(10)),
                'security_code' => Str::upper(Str::random(10)),
                'created_by' => $admin->id,
                'active' => true,
            ]);
        }

        $this->command->info('10 Activation codes created successfully.');

        $this->call(SystemSettingsSeeder::class);
        // $this->call(UserReferralSeeder::class);
    }
}
