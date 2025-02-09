<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::firstOrCreate([
            'email' => 'admin@admin.com',
        ], [
            'is_admin' => true,
            'name' => 'Admin User',
            'password' => Hash::make('password'),
        ]);

        $this->command->info('Admin user created successfully.');
    }
}
