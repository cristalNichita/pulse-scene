<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'code' => $this->code,

            'quantity' => $this->quantity,

            'unit_price' => (float) $this->unit_price,
            'total_price' => (float) $this->total_price,

            'currency' => $this->currency,

            'status' => $this->status->value,

            'booked_at' => $this->booked_at?->toISOString(),
            'cancelled_at' => $this->cancelled_at?->toISOString(),

            'event' => new EventResource(
                $this->whenLoaded('event'),
            ),
        ];
    }
}
