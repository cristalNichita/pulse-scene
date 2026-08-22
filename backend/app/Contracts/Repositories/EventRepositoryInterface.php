<?php

namespace App\Contracts\Repositories;

use App\DTOs\Event\EventFiltersData;
use App\Models\Event;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

interface EventRepositoryInterface
{
    public function paginatePublished(
        EventFiltersData $filters,
    ): LengthAwarePaginator;

    public function findPublishedBySlug(string $slug): Event;

    public function findFeatured(): ?Event;

    public function trending(int $limit): Collection;

    public function weekend(int $limit): Collection;

    public function popular(int $limit): Collection;
}
