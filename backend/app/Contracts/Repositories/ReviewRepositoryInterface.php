<?php

namespace App\Contracts\Repositories;

use App\Models\Event;
use App\Models\Review;
use App\Models\User;

interface ReviewRepositoryInterface
{
    public function existsForUserAndEvent(
        User $user,
        Event $event,
    ): bool;

    public function create(
        User $user,
        Event $event,
        int $rating,
        ?string $body,
    ): Review;
}
