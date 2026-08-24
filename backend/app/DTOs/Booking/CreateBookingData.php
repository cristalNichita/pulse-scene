<?php

namespace App\DTOs\Booking;

final readonly class CreateBookingData
{
    public function __construct(
        public string $eventSlug,
        public int $quantity,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            eventSlug: $data['event_slug'],
            quantity: $data['quantity'],
        );
    }
}
