<?php

namespace App\Services;

use App\Contracts\Repositories\CategoryRepositoryInterface;
use App\Contracts\Repositories\EventRepositoryInterface;
use App\DTOs\Home\HomePageData;

final readonly class HomeService
{
    public function __construct(
        private EventRepositoryInterface $events,
        private CategoryRepositoryInterface $categories,
    ) {}

    public function getPageData(): HomePageData
    {
        return new HomePageData(
            featuredEvent: $this->events->findFeatured(),

            trendingEvents: $this->events->trending(3),

            weekendEvents: $this->events->weekend(4),

            popularEvents: $this->events->popular(4),

            categories: $this->categories->forHomepage(4),
        );
    }
}
