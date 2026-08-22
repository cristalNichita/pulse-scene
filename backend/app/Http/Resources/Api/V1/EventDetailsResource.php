<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventDetailsResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,

            'title' => $this->title,
            'subtitle' => $this->subtitle,

            'description' => $this->description,
            'content' => $this->content,

            'starts_at' => $this->starts_at?->toISOString(),
            'ends_at' => $this->ends_at?->toISOString(),

            'price_from' => (float) $this->price,
            'currency' => $this->currency,

            'capacity' => $this->capacity,
            'minimum_age' => $this->minimum_age,

            'rating' => round(
                (float) ($this->reviews_avg_rating ?? 0),
                1,
            ),

            'review_count' => (int) ($this->reviews_count ?? 0),

            'image_url' => $this->cover_image,

            'category' => new CategoryResource(
                $this->whenLoaded('category'),
            ),

            'venue' => new VenueResource(
                $this->whenLoaded('venue'),
            ),

            'organizer' => new OrganizerResource(
                $this->whenLoaded('organizer'),
            ),

            'gallery' => $this
                ->whenLoaded('images')
                ->map(
                    fn ($image) => [
                        'id' => $image->id,
                        'url' => $image->path,
                        'position' => $image->position,
                    ],
                )
                ->values(),

            'reviews' => ReviewResource::collection(
                $this->whenLoaded('reviews'),
            ),

            'is_featured' => $this->is_featured,
        ];
    }
}
