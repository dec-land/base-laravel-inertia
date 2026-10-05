<?php

declare(strict_types=1);

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class ErrorResponse implements Responsable
{
    public function __construct(
        protected readonly ?string $message = null,
        protected readonly ?int $status = Response::HTTP_INTERNAL_SERVER_ERROR,
    ) {}

    public function toResponse(): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $this->message,
        ], $this->status);
    }
}
