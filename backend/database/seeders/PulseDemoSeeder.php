<?php

namespace Database\Seeders;

use App\Enums\EventStatus;
use App\Models\Category;
use App\Models\Event;
use App\Models\Organizer;
use App\Models\Review;
use App\Models\User;
use App\Models\Venue;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class PulseDemoSeeder extends Seeder
{
    public function run(): void
    {
        DB::transaction(function (): void {
            $categories = $this->seedCategories();
            $venues = $this->seedVenues();
            $organizers = $this->seedOrganizers();

            $this->seedEvents(
                categories: $categories,
                venues: $venues,
                organizers: $organizers,
            );

            $this->seedReviews();
        });
    }

    private function seedCategories(): array
    {
        $items = [
            [
                'name' => 'Music',
                'slug' => 'music',
            ],
            [
                'name' => 'Technology',
                'slug' => 'technology',
            ],
            [
                'name' => 'Food',
                'slug' => 'food',
            ],
            [
                'name' => 'Art',
                'slug' => 'art',
            ],
            [
                'name' => 'Sports',
                'slug' => 'sports',
            ],
            [
                'name' => 'Workshops',
                'slug' => 'workshops',
            ],
            [
                'name' => 'Nightlife',
                'slug' => 'nightlife',
            ],
            [
                'name' => 'Comedy',
                'slug' => 'comedy',
            ],
        ];

        $categories = [];

        foreach ($items as $item) {
            $category = Category::query()->updateOrCreate(
                ['slug' => $item['slug']],
                $item,
            );

            $categories[$category->slug] = $category;
        }

        return $categories;
    }

    private function seedVenues(): array
    {
        $items = [
            [
                'name' => 'Valea Morilor',
                'slug' => 'valea-morilor',
                'city' => 'Chișinău',
                'country' => 'Moldova',
                'address' => 'Valea Morilor Park, Chișinău',
            ],
            [
                'name' => 'Artcor',
                'slug' => 'artcor',
                'city' => 'Chișinău',
                'country' => 'Moldova',
                'address' => 'Strada 31 August 1989, Chișinău',
            ],
            [
                'name' => 'Tekwill',
                'slug' => 'tekwill',
                'city' => 'Chișinău',
                'country' => 'Moldova',
                'address' => 'Strada Studenților 9/11, Chișinău',
            ],
            [
                'name' => 'Digital Park',
                'slug' => 'digital-park',
                'city' => 'Chișinău',
                'country' => 'Moldova',
                'address' => 'Strada Mihai Viteazul 15, Chișinău',
            ],
            [
                'name' => 'Mediacor',
                'slug' => 'mediacor',
                'city' => 'Chișinău',
                'country' => 'Moldova',
                'address' => 'Strada Alexei Mateevici, Chișinău',
            ],
            [
                'name' => 'Rooftop 27',
                'slug' => 'rooftop-27',
                'city' => 'Chișinău',
                'country' => 'Moldova',
                'address' => 'Chișinău',
            ],
            [
                'name' => 'Valea Trandafirilor',
                'slug' => 'valea-trandafirilor',
                'city' => 'Chișinău',
                'country' => 'Moldova',
                'address' => 'Valea Trandafirilor Park, Chișinău',
            ],
            [
                'name' => 'Forma Studio',
                'slug' => 'forma-studio',
                'city' => 'Chișinău',
                'country' => 'Moldova',
                'address' => 'Chișinău',
            ],
            [
                'name' => 'Grădina Botanică',
                'slug' => 'gradina-botanica',
                'city' => 'Chișinău',
                'country' => 'Moldova',
                'address' => 'Strada Pădurii 18, Chișinău',
            ],
            [
                'name' => 'Casa Dacă',
                'slug' => 'casa-daca',
                'city' => 'Chișinău',
                'country' => 'Moldova',
                'address' => 'Chișinău',
            ],
            [
                'name' => 'Palatul Republicii',
                'slug' => 'palatul-republicii',
                'city' => 'Chișinău',
                'country' => 'Moldova',
                'address' => 'Strada Maria Cebotari 16, Chișinău',
            ],
            [
                'name' => 'Queer Cafe',
                'slug' => 'queer-cafe',
                'city' => 'Chișinău',
                'country' => 'Moldova',
                'address' => 'Chișinău',
            ],
        ];

        $venues = [];

        foreach ($items as $item) {
            $venue = Venue::query()->updateOrCreate(
                ['slug' => $item['slug']],
                $item,
            );

            $venues[$venue->slug] = $venue;
        }

        return $venues;
    }

    private function seedOrganizers(): array
    {
        $items = [
            [
                'name' => 'Nocturne Collective',
                'slug' => 'nocturne-collective',
                'description' => 'Independent music and cultural experiences built around unexpected spaces in Chișinău.',
            ],
            [
                'name' => 'Pulse Culture',
                'slug' => 'pulse-culture',
                'description' => 'Curating contemporary culture, design, food and city experiences.',
            ],
            [
                'name' => 'Future Moldova',
                'slug' => 'future-moldova',
                'description' => 'Connecting technology, creativity and ambitious people through live events.',
            ],
        ];

        $organizers = [];

        foreach ($items as $item) {
            $organizer = Organizer::query()->updateOrCreate(
                ['slug' => $item['slug']],
                $item,
            );

            $organizers[$organizer->slug] = $organizer;
        }

        return $organizers;
    }

    private function seedEvents(
        array $categories,
        array $venues,
        array $organizers,
    ): void {
        $events = [
            [
                'slug' => 'electric-nights',
                'title' => 'Electric Nights',
                'subtitle' => 'Open Air Music Festival',
                'description' => 'Electronic music, immersive light installations and a summer night under the open sky.',
                'content' => <<<'TEXT'
Electric Nights brings together electronic music, visual art and open-air atmosphere for one late-summer night at Valea Morilor.

The programme moves from warm sunset sets into deeper sounds after dark, while immersive light installations transform the space around the lake.

Come early, stay late and expect a night built around music, movement and the city at its best.
TEXT,
                'category' => 'music',
                'venue' => 'valea-morilor',
                'organizer' => 'nocturne-collective',
                'cover_image' => '/images/events/electric-nights.jpeg',
                'starts_at' => '2026-08-29 20:00:00',
                'price' => 25,
                'capacity' => 1200,
                'minimum_age' => 18,
                'is_featured' => true,
                'gallery' => [
                    '/images/events/electric-nights.jpeg',
                    '/images/events/electric-nights-2.jpg',
                    '/images/events/electric-nights-3.jpeg',
                ],
            ],
            [
                'slug' => 'midnight-jazz-session',
                'title' => 'Midnight Jazz Session',
                'subtitle' => 'Live music after dark',
                'description' => 'An intimate late-night jazz session with local and international musicians.',
                'category' => 'music',
                'venue' => 'artcor',
                'organizer' => 'nocturne-collective',
                'cover_image' => '/images/events/midnight-jazz.jpg',
                'starts_at' => '2026-08-28 21:30:00',
                'price' => 18,
            ],
            [
                'slug' => 'tech-future-2026',
                'title' => 'Tech Future 2026',
                'subtitle' => 'Ideas shaping tomorrow',
                'description' => 'A day of talks, product showcases and conversations about technology and creativity.',
                'category' => 'technology',
                'venue' => 'tekwill',
                'organizer' => 'future-moldova',
                'cover_image' => '/images/events/tech-future.jpg',
                'starts_at' => '2026-08-30 10:00:00',
                'price' => 25,
            ],
            [
                'slug' => 'urban-food-weekend',
                'title' => 'Urban Food Weekend',
                'subtitle' => 'Taste the city',
                'description' => 'Independent kitchens, local chefs, music and a full weekend of street food.',
                'category' => 'food',
                'venue' => 'digital-park',
                'organizer' => 'pulse-culture',
                'cover_image' => '/images/events/urban-food.jpeg',
                'starts_at' => '2026-08-29 12:00:00',
                'price' => 0,
            ],
            [
                'slug' => 'digital-art-immersion',
                'title' => 'Digital Art Immersion',
                'subtitle' => 'Light, sound and motion',
                'description' => 'An audiovisual exhibition transforming a familiar space into something completely new.',
                'category' => 'art',
                'venue' => 'mediacor',
                'organizer' => 'pulse-culture',
                'cover_image' => '/images/events/digital-art.jpeg',
                'starts_at' => '2026-08-29 18:30:00',
                'price' => 16,
            ],
            [
                'slug' => 'rooftop-cinema-night',
                'title' => 'Rooftop Cinema Night',
                'subtitle' => 'Movies above the city',
                'description' => 'A late summer rooftop screening with drinks, city lights and open-air atmosphere.',
                'category' => 'art',
                'venue' => 'rooftop-27',
                'organizer' => 'pulse-culture',
                'cover_image' => '/images/events/rooftop-cinema.webp',
                'starts_at' => '2026-08-29 21:00:00',
                'price' => 12,
            ],
            [
                'slug' => 'sunset-city-run',
                'title' => 'Sunset City Run',
                'subtitle' => 'Move through the city',
                'description' => 'A relaxed evening run through the city followed by music and refreshments.',
                'category' => 'sports',
                'venue' => 'valea-trandafirilor',
                'organizer' => 'pulse-culture',
                'cover_image' => '/images/events/sunset-run.avif',
                'starts_at' => '2026-08-30 18:00:00',
                'price' => 8,
            ],
            [
                'slug' => 'ceramic-sunday',
                'title' => 'Ceramic Sunday',
                'subtitle' => 'Make something by hand',
                'description' => 'A slow Sunday workshop for beginners with clay, coffee and a small creative group.',
                'category' => 'workshops',
                'venue' => 'forma-studio',
                'organizer' => 'pulse-culture',
                'cover_image' => '/images/events/ceramic-sunday.jpg',
                'starts_at' => '2026-08-30 13:00:00',
                'price' => 20,
            ],
            [
                'slug' => 'symphony-under-stars',
                'title' => 'Symphony Under Stars',
                'subtitle' => 'An orchestra beneath the summer sky',
                'description' => 'An open-air evening of classical music, candlelight and late-summer atmosphere.',
                'category' => 'music',
                'venue' => 'gradina-botanica',
                'organizer' => 'nocturne-collective',
                'cover_image' => '/images/events/symphony-under-stars.jpg',
                'starts_at' => '2026-09-04 20:00:00',
                'price' => 30,
            ],
            [
                'slug' => 'wine-and-vinyl',
                'title' => 'Wine & Vinyl',
                'subtitle' => 'Slow records, good bottles, late hours',
                'description' => 'A relaxed listening session pairing curated vinyl selections with local wines.',
                'category' => 'nightlife',
                'venue' => 'casa-daca',
                'organizer' => 'nocturne-collective',
                'cover_image' => '/images/events/wine-and-vinyl.webp',
                'starts_at' => '2026-09-05 19:30:00',
                'price' => 14,
            ],
            [
                'slug' => 'makers-market',
                'title' => 'Makers Market',
                'subtitle' => 'Independent design and local craft',
                'description' => 'A weekend market featuring independent studios, small brands and local makers.',
                'category' => 'art',
                'venue' => 'palatul-republicii',
                'organizer' => 'pulse-culture',
                'cover_image' => '/images/events/makers-market.webp',
                'starts_at' => '2026-09-06 11:00:00',
                'price' => 0,
            ],
            [
                'slug' => 'standup-after-dark',
                'title' => 'Stand-up After Dark',
                'subtitle' => 'A small room and very bad decisions',
                'description' => 'A late comedy show bringing together some of the city’s sharpest emerging performers.',
                'category' => 'comedy',
                'venue' => 'queer-cafe',
                'organizer' => 'pulse-culture',
                'cover_image' => '/images/events/standup-after-dark.jpg',
                'starts_at' => '2026-09-06 21:00:00',
                'price' => 15,
            ],
        ];

        foreach ($events as $data) {
            $gallery = $data['gallery'] ?? [];

            unset($data['gallery']);

            $event = Event::query()->updateOrCreate(
                [
                    'slug' => $data['slug'],
                ],
                [
                    'category_id' => $categories[$data['category']]->id,
                    'venue_id' => $venues[$data['venue']]->id,
                    'organizer_id' => $organizers[$data['organizer']]->id,

                    'title' => $data['title'],
                    'subtitle' => $data['subtitle'],
                    'description' => $data['description'],
                    'content' => $data['content'] ?? $data['description'],

                    'cover_image' => $data['cover_image'],

                    'starts_at' => $data['starts_at'],
                    'ends_at' => null,

                    'price' => $data['price'],
                    'currency' => 'USD',

                    'capacity' => $data['capacity'] ?? 300,
                    'minimum_age' => $data['minimum_age'] ?? null,

                    'status' => EventStatus::Published,
                    'is_featured' => $data['is_featured'] ?? false,
                    'published_at' => now()->subDays(7),
                ],
            );

            $event->images()->delete();

            foreach ($gallery as $position => $path) {
                $event->images()->create([
                    'path' => $path,
                    'position' => $position,
                ]);
            }
        }
    }

    private function seedReviews(): void
    {
        $event = Event::query()
            ->where('slug', 'electric-nights')
            ->firstOrFail();

        $reviewers = [
            [
                'name' => 'Maya Rusu',
                'email' => 'maya@example.com',
                'rating' => 5,
                'body' => 'The atmosphere was incredible. Great music, beautiful lights and a crowd that actually came to enjoy the night.',
            ],
            [
                'name' => 'Victor Ceban',
                'email' => 'victor@example.com',
                'rating' => 5,
                'body' => 'One of the best open-air events I have been to in Chișinău. The location worked perfectly after sunset.',
            ],
            [
                'name' => 'Sofia Rotaru',
                'email' => 'sofia@example.com',
                'rating' => 4,
                'body' => 'Really strong production and a great lineup. I would definitely come back next year.',
            ],
        ];

        foreach ($reviewers as $data) {
            $user = User::query()->updateOrCreate(
                [
                    'email' => $data['email'],
                ],
                [
                    'name' => $data['name'],
                    'password' => Hash::make('password'),
                ],
            );

            Review::query()->updateOrCreate(
                [
                    'user_id' => $user->id,
                    'event_id' => $event->id,
                ],
                [
                    'rating' => $data['rating'],
                    'body' => $data['body'],
                ],
            );
        }
    }
}
