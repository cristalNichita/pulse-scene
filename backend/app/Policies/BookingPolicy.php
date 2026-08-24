<?php

namespace App\Policies;

use App\Enums\BookingStatus;
use App\Models\Booking;
use App\Models\User;

class BookingPolicy
{
    public function view(
        User $user,
        Booking $booking,
    ): bool {
        return $booking->user_id === $user->id;
    }

    public function cancel(
        User $user,
        Booking $booking,
    ): bool {
        return
            $booking->user_id === $user->id &&
            $booking->status === BookingStatus::Confirmed &&
            $booking->event->starts_at->isFuture();
    }
}
