<?php

namespace Database\Factories;

use App\Enums\BookingStatus;
use App\Models\Booking;
use App\Models\Event;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Booking>
 */
class BookingFactory extends Factory
{
    public function definition(): array
    {
        $quantity = fake()->numberBetween(1, 4);
        $unitPrice = fake()->randomElement([
            0,
            15,
            20,
            25,
            30,
        ]);

        return [
            'user_id' => User::factory(),
            'event_id' => Event::factory(),

            'code' => 'PLS-'.Str::upper(
                Str::random(8),
            ),

            'quantity' => $quantity,

            'unit_price' => $unitPrice,
            'total_price' => $unitPrice * $quantity,

            'currency' => 'USD',

            'status' => BookingStatus::Confirmed,

            'booked_at' => now(),
            'cancelled_at' => null,
        ];
    }

    public function cancelled(): static
    {
        return $this->state(fn (): array => [
            'status' => BookingStatus::Cancelled,
            'cancelled_at' => now(),
        ]);
    }
}
