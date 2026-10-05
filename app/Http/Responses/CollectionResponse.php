<?php

declare(strict_types=1);

namespace App\Http\Responses;

use App\Http\Resources\PaginatedResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Collection;
use Symfony\Component\HttpFoundation\Response;

class CollectionResponse implements Responsable
{
    public function __construct(
        protected readonly array|Collection|AnonymousResourceCollection $data,
        protected readonly ?PaginatedResource $meta = null,
        protected readonly int $status = Response::HTTP_OK
    ) {}

    public function toResponse(): JsonResponse
    {
        $meta = $this->meta ? $this->meta : [
            'size' => count($this->data),
        ];

        return response()->json([
            'success' => true,
            'data' => $this->data,
            'meta' => $meta,
        ], $this->status);
    }
}
