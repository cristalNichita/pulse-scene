<?php

namespace App\DTOs\Home;

use App\Models\Event;
use Illuminate\Support\Collection;

final readonly class HomePageData
{
    public function __construct(
        public ?Event $featuredEvent,
        public Collection $trendingEvents,
        public Collection $weekendEvents,
        public Collection $popularEvents,
        public Collection $categories,
    ) {}
}
