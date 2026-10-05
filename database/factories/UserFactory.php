<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\User;
use App\Settings\FubballEconomySettings;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
            'remember_token' => Str::random(10),
            'is_admin' => false,
            'has_completed_onboarding' => false,
            'pints' => rescue(
                fn () => app(FubballEconomySettings::class)->default_pints,
                100,
                false,
            ),
        ];
    }
}
