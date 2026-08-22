<?php

namespace Tests\Feature\Api\V1;

use App\Models\Category;
use App\Models\Event;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CategoryCatalogTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_returns_categories_with_published_event_counts(): void
    {
        $music = Category::factory()->create([
            'name' => 'Music',
            'slug' => 'music',
        ]);

        Event::factory()
            ->for($music)
            ->count(3)
            ->create();

        Event::factory()
            ->for($music)
            ->draft()
            ->create();

        $response = $this->getJson(
            '/api/v1/categories',
        );

        $response
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath(
                'data.0.slug',
                'music',
            )
            ->assertJsonPath(
                'data.0.event_count',
                3,
            );
    }
}
