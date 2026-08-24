<?php

namespace App\Repositories\Eloquent;

use App\Contracts\Repositories\BookingRepositoryInterface;
use App\Enums\BookingStatus;
use App\Models\Booking;
use App\Models\Event;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class BookingRepository implements BookingRepositoryInterface
{
    public function paginateForUser(
        User $user,
        int $perPage,
    ): LengthAwarePaginator {
        return Booking::query()
            ->where('user_id', $user->id)
            ->with([
                'event.category',
                'event.venue',
            ])
            ->latest('booked_at')
            ->paginate($perPage);
    }

    public function reservedQuantityForEvent(
        Event $event,
    ): int {
        return (int) Booking::query()
            ->where('event_id', $event->id)
            ->where(
                'status',
                BookingStatus::Confirmed,
            )
            ->sum('quantity');
    }

    public function create(
        array $attributes,
    ): Booking {
        return Booking::query()->create(
            $attributes,
        );
    }

    public function cancel(
        Booking $booking,
    ): Booking {
        $booking->update([
            'status' => BookingStatus::Cancelled,
            'cancelled_at' => now(),
        ]);

        return $booking->refresh();
    }
}
