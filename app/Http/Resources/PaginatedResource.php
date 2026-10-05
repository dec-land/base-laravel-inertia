<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * @mixin LengthAwarePaginator
 */
class PaginatedResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'from' => $this->getFrom(),
            'to' => $this->getTo(),
            'total' => $this->getTotal(),
            'per_page' => $this->getPerPage(),
            'current_page' => $this->getCurrentPage(),
            'last_page' => $this->getLastPage(),
            'size' => $this->getSize(),
            'has_prev' => $this->hasPrevious(),
            'has_next' => $this->hasNext(),
        ];
    }

    public function getFrom(): ?int
    {
        $from = $this->firstItem();

        return $from !== null ? (int) $from : null;
    }

    public function getTo(): ?int
    {
        $to = $this->lastItem();

        return $to !== null ? (int) $to : null;
    }

    public function getTotal(): int
    {
        return (int) $this->total();
    }

    public function getPerPage(): int
    {
        return (int) $this->perPage();
    }

    public function getCurrentPage(): int
    {
        return (int) $this->currentPage();
    }

    public function getLastPage(): int
    {
        return (int) $this->lastPage();
    }

    public function getSize(): int
    {
        return $this->count();
    }

    public function hasPrevious(): bool
    {
        return $this->previousPageUrl() !== null;
    }

    public function hasNext(): bool
    {
        return $this->nextPageUrl() !== null;
    }
}
