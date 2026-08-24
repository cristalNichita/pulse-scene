<?php

namespace Tests\Feature\Api\V1;

use App\Models\Event;
use App\Models\Favorite;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FavoriteTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_cannot_access_favorites(): void
    {
        $this
            ->getJson('/api/v1/me/favorites')
            ->assertUnauthorized();

        $this
            ->postJson('/api/v1/events/event/favorite')
            ->assertUnauthorized();
    }

    public function test_user_can_favorite_a_published_event(): void
    {
        $user = User::factory()->create();

        $event = Event::factory()->create([
            'slug' => 'electric-nights',
        ]);

        $this
            ->actingAs($user)
            ->postJson(
                '/api/v1/events/electric-nights/favorite',
            )
            ->assertOk();

        $this->assertDatabaseHas(
            'favorites',
            [
                'user_id' => $user->id,
                'event_id' => $event->id,
            ],
        );
    }

    public function test_favoriting_an_event_is_idempotent(): void
    {
        $user = User::factory()->create();

        $event = Event::factory()->create([
            'slug' => 'electric-nights',
        ]);

        $this->actingAs($user);

        $this->postJson(
            '/api/v1/events/electric-nights/favorite',
        );

        $this->postJson(
            '/api/v1/events/electric-nights/favorite',
        );

        $this->assertSame(
            1,
            Favorite::query()
                ->where('user_id', $user->id)
                ->where('event_id', $event->id)
                ->count(),
        );
    }

    public function test_user_can_remove_a_favorite(): void
    {
        $user = User::factory()->create();

        $event = Event::factory()->create([
            'slug' => 'electric-nights',
        ]);

        Favorite::factory()->create([
            'user_id' => $user->id,
            'event_id' => $event->id,
        ]);

        $this
            ->actingAs($user)
            ->deleteJson(
                '/api/v1/events/electric-nights/favorite',
            )
            ->assertOk();

        $this->assertDatabaseMissing(
            'favorites',
            [
                'user_id' => $user->id,
                'event_id' => $event->id,
            ],
        );
    }

    public function test_user_can_fetch_their_favorite_events(): void
    {
        $user = User::factory()->create();

        $favoriteEvent = Event::factory()->create([
            'slug' => 'electric-nights',
            'title' => 'Electric Nights',
        ]);

        Event::factory()->create([
            'slug' => 'not-saved',
        ]);

        Favorite::factory()->create([
            'user_id' => $user->id,
            'event_id' => $favoriteEvent->id,
        ]);

        $this
            ->actingAs($user)
            ->getJson('/api/v1/me/favorites')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath(
                'data.0.slug',
                'electric-nights',
            );
    }

    public function test_user_cannot_favorite_a_draft_event(): void
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
                '/api/v1/events/secret-event/favorite',
            )
            ->assertNotFound();
    }
}
