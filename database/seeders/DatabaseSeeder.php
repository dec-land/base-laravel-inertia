<?php

declare(strict_types=1);

namespace Database\Seeders;

use App;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if (App::environment('testing')) {
            return;
        }

        $this->call([
            UserSeeder::class,
        ]);
    }
}
