<?php

namespace Tests\Feature\Api\V1;

use App\Enums\BookingStatus;
use App\Models\Booking;
use App\Models\Event;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BookingTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_cannot_create_booking(): void
    {
        $this
            ->postJson('/api/v1/bookings', [
                'event_slug' => 'electric-nights',
                'quantity' => 2,
            ])
            ->assertUnauthorized();
    }

    public function test_user_can_create_booking(): void
    {
        $user = User::factory()->create();

        $event = Event::factory()->create([
            'slug' => 'electric-nights',
            'price' => 25,
            'capacity' => 100,
        ]);

        $response = $this
            ->actingAs($user)
            ->postJson('/api/v1/bookings', [
                'event_slug' => 'electric-nights',
                'quantity' => 2,
            ]);

        $response
            ->assertCreated()
            ->assertJsonPath(
                'data.quantity',
                2,
            )
            ->assertJsonPath(
                'data.total_price',
                50,
            )
            ->assertJsonPath(
                'data.status',
                'confirmed',
            );

        $this->assertDatabaseHas(
            'bookings',
            [
                'user_id' => $user->id,
                'event_id' => $event->id,
                'quantity' => 2,
                'status' => BookingStatus::Confirmed->value,
            ],
        );
    }

    public function test_booking_respects_event_capacity(): void
    {
        $user = User::factory()->create();

        $event = Event::factory()->create([
            'slug' => 'tiny-event',
            'capacity' => 3,
        ]);

        Booking::factory()->create([
            'event_id' => $event->id,
            'quantity' => 2,
        ]);

        $this
            ->actingAs($user)
            ->postJson('/api/v1/bookings', [
                'event_slug' => 'tiny-event',
                'quantity' => 2,
            ])
            ->assertConflict();
    }

    public function test_cancelled_bookings_do_not_consume_capacity(): void
    {
        $user = User::factory()->create();

        $event = Event::factory()->create([
            'slug' => 'tiny-event',
            'capacity' => 2,
        ]);

        Booking::factory()
            ->cancelled()
            ->create([
                'event_id' => $event->id,
                'quantity' => 2,
            ]);

        $this
            ->actingAs($user)
            ->postJson('/api/v1/bookings', [
                'event_slug' => 'tiny-event',
                'quantity' => 2,
            ])
            ->assertCreated();
    }

    public function test_user_can_fetch_their_bookings(): void
    {
        $user = User::factory()->create();

        Booking::factory()
            ->count(2)
            ->create([
                'user_id' => $user->id,
            ]);

        Booking::factory()->create();

        $this
            ->actingAs($user)
            ->getJson('/api/v1/me/bookings')
            ->assertOk()
            ->assertJsonCount(
                2,
                'data',
            );
    }

    public function test_user_can_view_their_booking(): void
    {
        $user = User::factory()->create();

        $booking = Booking::factory()->create([
            'user_id' => $user->id,
        ]);

        $this
            ->actingAs($user)
            ->getJson(
                "/api/v1/bookings/{$booking->code}",
            )
            ->assertOk()
            ->assertJsonPath(
                'data.code',
                $booking->code,
            );
    }

    public function test_user_cannot_view_someone_elses_booking(): void
    {
        $user = User::factory()->create();

        $booking = Booking::factory()->create();

        $this
            ->actingAs($user)
            ->getJson(
                "/api/v1/bookings/{$booking->code}",
            )
            ->assertForbidden();
    }

    public function test_user_can_cancel_booking(): void
    {
        $user = User::factory()->create();

        $booking = Booking::factory()->create([
            'user_id' => $user->id,
        ]);

        $this
            ->actingAs($user)
            ->deleteJson(
                "/api/v1/bookings/{$booking->code}",
            )
            ->assertOk()
            ->assertJsonPath(
                'data.status',
                'cancelled',
            );

        $this->assertDatabaseHas(
            'bookings',
            [
                'id' => $booking->id,
                'status' => BookingStatus::Cancelled->value,
            ],
        );
    }

    public function test_booking_quantity_is_validated(): void
    {
        $user = User::factory()->create();

        $this
            ->actingAs($user)
            ->postJson('/api/v1/bookings', [
                'event_slug' => 'anything',
                'quantity' => 9,
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors([
                'quantity',
            ]);
    }
}
