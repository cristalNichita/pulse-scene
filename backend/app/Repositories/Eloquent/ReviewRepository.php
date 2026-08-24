<?php

namespace App\Repositories\Eloquent;

use App\Contracts\Repositories\ReviewRepositoryInterface;
use App\Models\Event;
use App\Models\Review;
use App\Models\User;

class ReviewRepository implements ReviewRepositoryInterface
{
    public function existsForUserAndEvent(
        User $user,
        Event $event,
    ): bool {
        return Review::query()
            ->where('user_id', $user->id)
            ->where('event_id', $event->id)
            ->exists();
    }

    public function create(
        User $user,
        Event $event,
        int $rating,
        ?string $body,
    ): Review {
        return Review::query()->create([
            'user_id' => $user->id,
            'event_id' => $event->id,
            'rating' => $rating,
            'body' => $body,
        ]);
    }
}
