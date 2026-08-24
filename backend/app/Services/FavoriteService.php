<?php

namespace App\Services;

use App\Contracts\Repositories\EventRepositoryInterface;
use App\Contracts\Repositories\FavoriteRepositoryInterface;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

final readonly class FavoriteService
{
    public function __construct(
        private FavoriteRepositoryInterface $favorites,
        private EventRepositoryInterface $events,
    ) {}

    public function paginate(
        User $user,
        int $perPage = 24,
    ): LengthAwarePaginator {
        return $this->favorites->paginateForUser(
            $user,
            $perPage,
        );
    }

    public function add(
        User $user,
        string $eventSlug,
    ): void {
        $event = $this->events->findPublishedBySlug(
            $eventSlug,
        );

        $this->favorites->add(
            $user,
            $event,
        );
    }

    public function remove(
        User $user,
        string $eventSlug,
    ): void {
        $event = $this->events->findPublishedBySlug(
            $eventSlug,
        );

        $this->favorites->remove(
            $user,
            $event,
        );
    }
}
