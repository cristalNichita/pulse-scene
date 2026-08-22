<?php

namespace Database\Factories;

use App\Enums\EventStatus;
use App\Models\Category;
use App\Models\Event;
use App\Models\Organizer;
use App\Models\Venue;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Event>
 */
class EventFactory extends Factory
{
    public function definition(): array
    {
        $title = fake()->unique()->sentence(3);

        $startsAt = fake()->dateTimeBetween(
            '+1 day',
            '+2 months',
        );

        $endsAt = (clone $startsAt)->modify(
            sprintf(
                '+%d hours',
                fake()->numberBetween(1, 6),
            ),
        );

        return [
            'category_id' => Category::factory(),
            'venue_id' => Venue::factory(),
            'organizer_id' => Organizer::factory(),

            'title' => Str::headline($title),
            'slug' => Str::slug($title),

            'subtitle' => fake()->sentence(5),
            'description' => fake()->paragraph(),
            'content' => fake()->paragraphs(3, true),

            'cover_image' => '/images/events/electric-nights.jpeg',

            'starts_at' => $startsAt,
            'ends_at' => $endsAt,

            'price' => fake()->randomElement([
                0,
                10,
                15,
                20,
                25,
                30,
            ]),

            'currency' => 'USD',

            'capacity' => fake()->numberBetween(30, 2000),

            'minimum_age' => fake()->randomElement([
                null,
                16,
                18,
            ]),

            'status' => EventStatus::Published,

            'is_featured' => false,

            'published_at' => now()->subDay(),
        ];
    }

    public function draft(): static
    {
        return $this->state(fn (): array => [
            'status' => EventStatus::Draft,
            'published_at' => null,
        ]);
    }

    public function cancelled(): static
    {
        return $this->state(fn (): array => [
            'status' => EventStatus::Cancelled,
        ]);
    }

    public function featured(): static
    {
        return $this->state(fn (): array => [
            'is_featured' => true,
        ]);
    }

    public function free(): static
    {
        return $this->state(fn (): array => [
            'price' => 0,
        ]);
    }

    public function paid(float $price = 25): static
    {
        return $this->state(fn (): array => [
            'price' => $price,
        ]);
    }
}
