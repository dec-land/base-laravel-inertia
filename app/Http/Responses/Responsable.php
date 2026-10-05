<?php

declare(strict_types=1);

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

interface Responsable
{
    public function toResponse(): JsonResponse|Response;
}
