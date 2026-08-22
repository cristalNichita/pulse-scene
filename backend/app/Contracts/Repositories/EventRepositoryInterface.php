<?php

namespace App\Contracts\Repositories;

use App\DTOs\Event\EventFiltersData;
use App\Models\Event;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface EventRepositoryInterface
{
    public function paginatePublished(
        EventFiltersData $filters,
    ): LengthAwarePaginator;

    public function findPublishedBySlug(string $slug): Event;
}
