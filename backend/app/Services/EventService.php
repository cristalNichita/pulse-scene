<?php

namespace App\Services;

use App\Contracts\Repositories\EventRepositoryInterface;
use App\DTOs\Event\EventFiltersData;
use App\Models\Event;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class EventService
{
    public function __construct(
        private readonly EventRepositoryInterface $events,
    ) {}

    public function paginate(
        EventFiltersData $filters,
    ): LengthAwarePaginator {
        return $this->events->paginatePublished($filters);
    }

    public function findBySlug(string $slug): Event
    {
        return $this->events->findPublishedBySlug($slug);
    }
}
