<?php

namespace App\Contracts\Repositories;

use App\Models\Event;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface FavoriteRepositoryInterface
{
    public function paginateForUser(
        User $user,
        int $perPage,
    ): LengthAwarePaginator;

    public function add(
        User $user,
        Event $event,
    ): void;

    public function remove(
        User $user,
        Event $event,
    ): void;

    public function exists(
        User $user,
        Event $event,
    ): bool;
}
