<?php

declare(strict_types=1);

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class ValidationErrorResponse extends ErrorResponse
{
    public function __construct(
        protected readonly ?string $message = null,
        protected readonly ?int $status = Response::HTTP_UNPROCESSABLE_ENTITY,
        protected readonly ?array $errors = null,
    ) {}

    public function toResponse(): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $this->message,
            'errors' => $this->errors,
        ], $this->status);
    }
}
