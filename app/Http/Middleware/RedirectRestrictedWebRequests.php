<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectRestrictedWebRequests
{
    public function __construct(
    ) {}

    public function handle(Request $request, Closure $next): Response
    {
        // Usually has redirect things here for if site is down or need to choose a favourite team
        return $next($request);
    }
}
