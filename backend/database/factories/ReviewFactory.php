<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Review>
 */
class ReviewFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'event_id' => Event::factory(),

            'rating' => fake()->numberBetween(3, 5),
            'body' => fake()->paragraph(),
        ];
    }
}
