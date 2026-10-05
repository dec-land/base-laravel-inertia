<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    const DEFAULT_USER_ADMIN_EMAIL = 'admin@fubball.com';

    const DEFAULT_USER_EMAIL = 'user@fubball.com';

    public function run(): void
    {
        User::firstOrCreate(
            ['email' => self::DEFAULT_USER_ADMIN_EMAIL],
            [
                'name' => 'Admin User',
                'password' => Hash::make('Password1!'),
                'email_verified_at' => now(),
                'is_admin' => true,
            ]
        );

        User::firstOrCreate(
            ['email' => self::DEFAULT_USER_EMAIL],
            [
                'name' => 'Normal User',
                'password' => Hash::make('Password1!'),
                'email_verified_at' => now(),
                'is_admin' => false,
            ]
        );

        User::factory()->count(200)->create();
    }
}
