<?php

namespace App\Services;

use App\Contracts\Repositories\BookingRepositoryInterface;
use App\DTOs\Booking\CreateBookingData;
use App\Enums\BookingStatus;
use App\Exceptions\BookingCapacityExceededException;
use App\Models\Booking;
use App\Models\Event;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

final readonly class BookingService
{
    public function __construct(
        private BookingRepositoryInterface $bookings,
    ) {}

    public function paginate(
        User $user,
        int $perPage = 20,
    ): LengthAwarePaginator {
        return $this->bookings->paginateForUser(
            $user,
            $perPage,
        );
    }

    public function create(
        User $user,
        CreateBookingData $data,
    ): Booking {
        return DB::transaction(function () use (
            $user,
            $data,
        ): Booking {
            $event = Event::query()
                ->published()
                ->where(
                    'slug',
                    $data->eventSlug,
                )
                ->lockForUpdate()
                ->firstOrFail();

            if ($event->starts_at->isPast()) {
                throw new BookingCapacityExceededException;
            }

            if ($event->capacity !== null) {
                $reserved =
                    $this->bookings
                        ->reservedQuantityForEvent(
                            $event,
                        );

                if (
                    $reserved + $data->quantity >
                    $event->capacity
                ) {
                    throw new BookingCapacityExceededException;
                }
            }

            $unitPrice = (float) $event->price;

            $booking = $this->bookings->create([
                'user_id' => $user->id,
                'event_id' => $event->id,

                'code' => $this->generateCode(),

                'quantity' => $data->quantity,

                'unit_price' => $unitPrice,
                'total_price' => $unitPrice * $data->quantity,

                'currency' => $event->currency,

                'status' => BookingStatus::Confirmed,

                'booked_at' => now(),
            ]);

            return $booking->load([
                'event.category',
                'event.venue',
            ]);
        });
    }

    public function cancel(
        Booking $booking,
    ): Booking {
        if (
            $booking->status ===
            BookingStatus::Cancelled
        ) {
            return $booking;
        }

        return $this->bookings->cancel(
            $booking,
        );
    }

    private function generateCode(): string
    {
        do {
            $code = 'PLS-'.Str::upper(
                Str::random(8),
            );
        } while (
            Booking::query()
                ->where('code', $code)
                ->exists()
        );

        return $code;
    }
}
