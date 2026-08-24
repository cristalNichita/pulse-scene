<?php

namespace Tests\Feature\Api\V1;

use App\Models\Event;
use App\Models\Review;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReviewTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_cannot_review_event(): void
    {
        $this
            ->postJson(
                '/api/v1/events/electric-nights/reviews',
                [
                    'rating' => 5,
                    'body' => 'Great event.',
                ],
            )
            ->assertUnauthorized();
    }

    public function test_user_can_review_published_event(): void
    {
        $user = User::factory()->create();

        $event = Event::factory()->create([
            'slug' => 'electric-nights',
        ]);

        $response = $this
            ->actingAs($user)
            ->postJson(
                '/api/v1/events/electric-nights/reviews',
                [
                    'rating' => 5,
                    'body' => 'Great atmosphere and production.',
                ],
            );

        $response
            ->assertCreated()
            ->assertJsonPath(
                'data.rating',
                5,
            )
            ->assertJsonPath(
                'data.body',
                'Great atmosphere and production.',
            )
            ->assertJsonPath(
                'data.author.id',
                $user->id,
            );

        $this->assertDatabaseHas(
            'reviews',
            [
                'user_id' => $user->id,
                'event_id' => $event->id,
                'rating' => 5,
            ],
        );
    }

    public function test_user_cannot_review_same_event_twice(): void
    {
        $user = User::factory()->create();

        $event = Event::factory()->create([
            'slug' => 'electric-nights',
        ]);

        Review::factory()->create([
            'user_id' => $user->id,
            'event_id' => $event->id,
        ]);

        $this
            ->actingAs($user)
            ->postJson(
                '/api/v1/events/electric-nights/reviews',
                [
                    'rating' => 4,
                    'body' => 'Another review.',
                ],
            )
            ->assertConflict()
            ->assertJsonPath(
                'message',
                'You have already reviewed this event.',
            );
    }

    public function test_review_rating_is_validated(): void
    {
        $user = User::factory()->create();

        Event::factory()->create([
            'slug' => 'electric-nights',
        ]);

        $this
            ->actingAs($user)
            ->postJson(
                '/api/v1/events/electric-nights/reviews',
                [
                    'rating' => 6,
                ],
            )
            ->assertUnprocessable()
            ->assertJsonValidationErrors([
                'rating',
            ]);
    }

    public function test_user_cannot_review_draft_event(): void
    {
        $user = User::factory()->create();

        Event::factory()
            ->draft()
            ->create([
                'slug' => 'secret-event',
            ]);

        $this
            ->actingAs($user)
            ->postJson(
                '/api/v1/events/secret-event/reviews',
                [
                    'rating' => 5,
                ],
            )
            ->assertNotFound();
    }

    public function test_new_review_updates_event_rating_aggregates(): void
    {
        $event = Event::factory()->create([
            'slug' => 'electric-nights',
        ]);

        Review::factory()->create([
            'event_id' => $event->id,
            'rating' => 4,
        ]);

        $user = User::factory()->create();

        $this
            ->actingAs($user)
            ->postJson(
                '/api/v1/events/electric-nights/reviews',
                [
                    'rating' => 5,
                ],
            )
            ->assertCreated();

        $this
            ->getJson(
                '/api/v1/events/electric-nights',
            )
            ->assertOk()
            ->assertJsonPath(
                'data.rating',
                4.5,
            )
            ->assertJsonPath(
                'data.review_count',
                2,
            );
    }
}
