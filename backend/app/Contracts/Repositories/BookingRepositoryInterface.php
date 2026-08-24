<?php

namespace App\Contracts\Repositories;

use App\Models\Booking;
use App\Models\Event;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface BookingRepositoryInterface
{
    public function paginateForUser(
        User $user,
        int $perPage,
    ): LengthAwarePaginator;

    public function reservedQuantityForEvent(
        Event $event,
    ): int;

    public function create(array $attributes): Booking;

    public function cancel(Booking $booking): Booking;
}
