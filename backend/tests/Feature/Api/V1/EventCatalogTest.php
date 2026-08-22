<?php

namespace Tests\Feature\Api\V1;

use App\Models\Category;
use App\Models\Event;
use App\Models\Review;
use App\Models\User;
use App\Models\Venue;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EventCatalogTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_returns_only_published_events(): void
    {
        Event::factory()
            ->count(3)
            ->create();

        Event::factory()
            ->draft()
            ->create();

        Event::factory()
            ->cancelled()
            ->create();

        $response = $this->getJson('/api/v1/events');

        $response
            ->assertOk()
            ->assertJsonCount(3, 'data');
    }

    public function test_it_filters_events_by_search_term(): void
    {
        Event::factory()->create([
            'title' => 'Midnight Jazz Session',
        ]);

        Event::factory()->create([
            'title' => 'Urban Food Weekend',
        ]);

        $response = $this->getJson(
            '/api/v1/events?search=jazz',
        );

        $response
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath(
                'data.0.title',
                'Midnight Jazz Session',
            );
    }

    public function test_it_filters_events_by_category(): void
    {
        $music = Category::factory()->create([
            'name' => 'Music',
            'slug' => 'music',
        ]);

        $art = Category::factory()->create([
            'name' => 'Art',
            'slug' => 'art',
        ]);

        Event::factory()
            ->for($music)
            ->count(2)
            ->create();

        Event::factory()
            ->for($art)
            ->create();

        $response = $this->getJson(
            '/api/v1/events?category=music',
        );

        $response
            ->assertOk()
            ->assertJsonCount(2, 'data');

        foreach ($response->json('data') as $event) {
            $this->assertSame(
                'music',
                $event['category']['slug'],
            );
        }
    }

    public function test_it_filters_free_events(): void
    {
        Event::factory()
            ->free()
            ->count(2)
            ->create();

        Event::factory()
            ->paid()
            ->create();

        $response = $this->getJson(
            '/api/v1/events?price=free',
        );

        $response
            ->assertOk()
            ->assertJsonCount(2, 'data');
    }

    public function test_it_filters_events_by_location(): void
    {
        $chisinau = Venue::factory()->create([
            'city' => 'Chișinău',
        ]);

        $balti = Venue::factory()->create([
            'city' => 'Bălți',
        ]);

        Event::factory()
            ->for($chisinau)
            ->create();

        Event::factory()
            ->for($balti)
            ->create();

        $response = $this->getJson(
            '/api/v1/events?location=Chi%C8%99in%C4%83u',
        );

        $response
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath(
                'data.0.venue.city',
                'Chișinău',
            );
    }

    public function test_it_returns_event_details_by_slug(): void
    {
        $event = Event::factory()->create([
            'slug' => 'electric-nights',
            'title' => 'Electric Nights',
        ]);

        $event->images()->createMany([
            [
                'path' => '/images/one.jpg',
                'position' => 0,
            ],
            [
                'path' => '/images/two.jpg',
                'position' => 1,
            ],
        ]);

        $response = $this->getJson(
            '/api/v1/events/electric-nights',
        );

        $response
            ->assertOk()
            ->assertJsonPath(
                'data.slug',
                'electric-nights',
            )
            ->assertJsonPath(
                'data.title',
                'Electric Nights',
            )
            ->assertJsonCount(
                2,
                'data.gallery',
            );
    }

    public function test_it_does_not_expose_draft_event_details(): void
    {
        Event::factory()
            ->draft()
            ->create([
                'slug' => 'secret-event',
            ]);

        $this
            ->getJson('/api/v1/events/secret-event')
            ->assertNotFound();
    }

    public function test_it_validates_catalog_filters(): void
    {
        $this
            ->getJson('/api/v1/events?price=something')
            ->assertUnprocessable()
            ->assertJsonValidationErrors([
                'price',
            ]);
    }

    public function test_event_details_include_review_aggregates(): void
    {
        $event = Event::factory()->create([
            'slug' => 'electric-nights',
        ]);

        $firstUser = User::factory()->create();
        $secondUser = User::factory()->create();

        Review::factory()->create([
            'event_id' => $event->id,
            'user_id' => $firstUser->id,
            'rating' => 5,
        ]);

        Review::factory()->create([
            'event_id' => $event->id,
            'user_id' => $secondUser->id,
            'rating' => 4,
        ]);

        $response = $this->getJson(
            '/api/v1/events/electric-nights',
        );

        $response
            ->assertOk()
            ->assertJsonPath(
                'data.rating',
                4.5,
            )
            ->assertJsonPath(
                'data.review_count',
                2,
            )
            ->assertJsonCount(
                2,
                'data.reviews',
            );
    }
}
