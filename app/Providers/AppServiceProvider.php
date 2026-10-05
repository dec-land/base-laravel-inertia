<?php

declare(strict_types=1);

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // Register singletons here
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->enableAutomaticRelationshipEagerLoading();

        JsonResource::withoutWrapping();

        RateLimiter::for('public', function (Request $request) {
            return Limit::perMinute(200)->by($request->user()?->id ?: $request->ip());
        });
    }

    private function enableAutomaticRelationshipEagerLoading(): void
    {
        Model::automaticallyEagerLoadRelationships();
    }
}
