<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,

            'title' => $this->title,
            'subtitle' => $this->subtitle,
            'description' => $this->description,

            'starts_at' => $this->starts_at?->toISOString(),
            'ends_at' => $this->ends_at?->toISOString(),

            'price_from' => (float) $this->price,
            'currency' => $this->currency,

            'image_url' => $this->cover_image,

            'category' => new CategoryResource(
                $this->whenLoaded('category'),
            ),

            'venue' => new VenueResource(
                $this->whenLoaded('venue'),
            ),

            'is_featured' => $this->is_featured,
        ];
    }
}
