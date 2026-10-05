<?php

declare(strict_types=1);

use App\Providers\AppServiceProvider;
use App\Providers\TypeScriptTransformerServiceProvider;
use SocialiteProviders\Manager\ServiceProvider;

return [
    AppServiceProvider::class,
    TypeScriptTransformerServiceProvider::class,
    ServiceProvider::class,
];
