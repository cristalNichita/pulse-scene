<?php

namespace App\Services;

use App\Contracts\Repositories\EventRepositoryInterface;
use App\Contracts\Repositories\ReviewRepositoryInterface;
use App\Exceptions\ReviewAlreadyExistsException;
use App\Models\Review;
use App\Models\User;

final readonly class ReviewService
{
    public function __construct(
        private ReviewRepositoryInterface $reviews,
        private EventRepositoryInterface $events,
    ) {}

    public function create(
        User $user,
        string $eventSlug,
        int $rating,
        ?string $body,
    ): Review {
        $event = $this->events->findPublishedBySlug(
            $eventSlug,
        );

        if (
            $this->reviews->existsForUserAndEvent(
                $user,
                $event,
            )
        ) {
            throw new ReviewAlreadyExistsException;
        }

        $review = $this->reviews->create(
            user: $user,
            event: $event,
            rating: $rating,
            body: $body,
        );

        return $review->load('user');
    }
}
