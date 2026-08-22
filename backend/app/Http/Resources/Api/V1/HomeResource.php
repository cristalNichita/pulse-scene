<?php

namespace App\Http\Resources\Api\V1;

use App\DTOs\Home\HomePageData;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HomeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        /** @var HomePageData $data */
        $data = $this->resource;

        return [
            'featured_event' => $data->featuredEvent
                ? new EventResource($data->featuredEvent)
                : null,

            'trending_events' => EventResource::collection(
                $data->trendingEvents,
            ),

            'weekend_events' => EventResource::collection(
                $data->weekendEvents,
            ),

            'popular_events' => EventResource::collection(
                $data->popularEvents,
            ),

            'categories' => CategoryResource::collection(
                $data->categories,
            ),
        ];
    }
}
