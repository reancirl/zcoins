<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserReferralSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Rey – the head of ZCoins (no sponsor)
        $rey = User::firstOrCreate(
            ['email' => 'rey@example.com'],
            [
                'username' => 'rey',
                'first_name' => 'Rey',
                'last_name' => 'Head',
                'password' => bcrypt('password'),
            ]
        );

        // Create direct referrals of Rey: Chermae and Jason
        $chermae = User::firstOrCreate(
            ['email' => 'chermae@example.com'],
            [
                'username' => 'chermae',
                'first_name' => 'Chermae',
                'last_name' => 'Doe',
                'sponsor_id' => $rey->id,
                'password' => bcrypt('password'),
            ]
        );

        $jason = User::firstOrCreate(
            ['email' => 'jason@example.com'],
            [
                'username' => 'jason',
                'first_name' => 'Jason',
                'last_name' => 'Smith',
                'sponsor_id' => $rey->id,
                'password' => bcrypt('password'),
            ]
        );

        // Create referrals for Jason: Max and Carlo
        $max = User::firstOrCreate(
            ['email' => 'max@example.com'],
            [
                'username' => 'max',
                'first_name' => 'Max',
                'last_name' => 'Johnson',
                'sponsor_id' => $jason->id,
                'password' => bcrypt('password'),
            ]
        );

        $carlo = User::firstOrCreate(
            ['email' => 'carlo@example.com'],
            [
                'username' => 'carlo',
                'first_name' => 'Carlo',
                'last_name' => 'Garcia',
                'sponsor_id' => $jason->id,
                'password' => bcrypt('password'),
            ]
        );

        // Create referrals for Chermae: Mariel and Tharra
        $mariel = User::firstOrCreate(
            ['email' => 'mariel@example.com'],
            [
                'username' => 'mariel',
                'first_name' => 'Mariel',
                'last_name' => 'Lopez',
                'sponsor_id' => $chermae->id,
                'password' => bcrypt('password'),
            ]
        );

        $tharra = User::firstOrCreate(
            ['email' => 'tharra@example.com'],
            [
                'username' => 'tharra',
                'first_name' => 'Tharra',
                'last_name' => 'Rodriguez',
                'sponsor_id' => $chermae->id,
                'password' => bcrypt('password'),
            ]
        );

        // **Extend the network to a third level**

        // For Max (referral of Jason), add two referrals: Liam and Olivia.
        $liam = User::firstOrCreate(
            ['email' => 'liam@example.com'],
            [
                'username' => 'liam',
                'first_name' => 'Liam',
                'last_name' => 'Brown',
                'sponsor_id' => $max->id,
                'password' => bcrypt('password'),
            ]
        );

        $olivia = User::firstOrCreate(
            ['email' => 'olivia@example.com'],
            [
                'username' => 'olivia',
                'first_name' => 'Olivia',
                'last_name' => 'Green',
                'sponsor_id' => $max->id,
                'password' => bcrypt('password'),
            ]
        );

        // For Mariel (referral of Chermae), add two referrals: Sophia and Jackson.
        $sophia = User::firstOrCreate(
            ['email' => 'sophia@example.com'],
            [
                'username' => 'sophia',
                'first_name' => 'Sophia',
                'last_name' => 'White',
                'sponsor_id' => $mariel->id,
                'password' => bcrypt('password'),
            ]
        );

        $jackson = User::firstOrCreate(
            ['email' => 'jackson@example.com'],
            [
                'username' => 'jackson',
                'first_name' => 'Jackson',
                'last_name' => 'Black',
                'sponsor_id' => $mariel->id,
                'password' => bcrypt('password'),
            ]
        );

        // For clarity, collect all users in an array.
        $users = [
            $rey,
            $chermae,
            $jason,
            $max,
            $carlo,
            $mariel,
            $tharra,
            $liam,
            $olivia,
            $sophia,
            $jackson
        ];

        // Output each user's computed net ZCoins for checking.
        foreach ($users as $user) {
            $netZCoins = $user->calculateNetZCoins();
            $this->command->info("User: {$user->first_name} {$user->last_name} (ID: {$user->id}) - Net ZCoins: {$netZCoins}");
        }
    }
}
