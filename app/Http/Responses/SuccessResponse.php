<?php

declare(strict_types=1);

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class SuccessResponse implements Responsable
{
    public function __construct(
        protected readonly mixed $data = null,
        protected readonly int $status = Response::HTTP_OK
    ) {}

    public function toResponse(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $this->data,
        ], $this->status);
    }
}
