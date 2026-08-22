<?php

namespace Database\Factories;

use App\Models\Venue;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Venue>
 */
class VenueFactory extends Factory
{
    public function definition(): array
    {
        $name = fake()->unique()->company().' Hall';

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'city' => 'Chișinău',
            'country' => 'Moldova',
            'address' => fake()->streetAddress(),
        ];
    }
}
