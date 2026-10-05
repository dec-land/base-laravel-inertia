<?php

declare(strict_types=1);

namespace App\Http\Controllers\Web;

use Inertia\Inertia;
use Inertia\Response;

class HomeController
{
    /**
     * Display the index page.
     */
    public function index(): Response
    {
        return Inertia::render('Index', [
            'appName' => config('app.name', 'Laravel + Inertia'),
            'message' => 'See UserFactory.php for the users seeded by default. Edit resources/js/pages/Index.tsx to begin.',
        ]);
    }
}
