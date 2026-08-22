<?php

namespace Tests\Feature\Api\V1;

use App\Models\Category;
use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HomePageTest extends TestCase
{
    use RefreshDatabase;

    protected function tearDown(): void
    {
        Carbon::setTestNow();

        parent::tearDown();
    }

    public function test_it_returns_homepage_discovery_data(): void
    {
        Carbon::setTestNow(
            Carbon::parse('2026-08-23 10:00:00'),
        );

        Category::factory()
            ->count(4)
            ->create();

        Event::factory()
            ->featured()
            ->create([
                'starts_at' => '2026-08-29 20:00:00',
            ]);

        Event::factory()
            ->trending()
            ->count(3)
            ->create([
                'starts_at' => '2026-08-28 20:00:00',
            ]);

        Event::factory()
            ->count(4)
            ->create([
                'starts_at' => '2026-08-30 14:00:00',
            ]);

        Event::factory()
            ->popular()
            ->count(4)
            ->create([
                'starts_at' => '2026-09-05 20:00:00',
            ]);

        $response = $this->getJson(
            '/api/v1/home',
        );

        $response
            ->assertOk()
            ->assertJsonStructure([
                'data' => [
                    'featured_event',
                    'trending_events',
                    'weekend_events',
                    'popular_events',
                    'categories',
                ],
            ])
            ->assertJsonCount(
                3,
                'data.trending_events',
            )
            ->assertJsonCount(
                4,
                'data.weekend_events',
            )
            ->assertJsonCount(
                4,
                'data.popular_events',
            )
            ->assertJsonCount(
                4,
                'data.categories',
            );
    }
}
