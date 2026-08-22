<?php

namespace App\DTOs\Event;

final readonly class EventFiltersData
{
    public function __construct(
        public ?string $search,
        public ?string $category,
        public ?string $location,
        public ?string $date,
        public ?string $price,
        public int $perPage,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            search: $data['search'] ?? null,
            category: $data['category'] ?? null,
            location: $data['location'] ?? null,
            date: $data['date'] ?? null,
            price: $data['price'] ?? null,
            perPage: $data['per_page'] ?? 12,
        );
    }
}
