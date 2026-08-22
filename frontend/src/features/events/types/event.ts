export interface EventCategory {
    id: number;
    name: string;
    slug: string;
}

export interface EventVenue {
    id: number;
    name: string;
    city: string;
}

export interface EventPreview {
    id: number;
    slug: string;

    title: string;
    subtitle: string;
    description: string;

    startsAt: string;

    priceFrom: number;

    imageUrl: string;

    category: EventCategory;
    venue: EventVenue;

    isFeatured: boolean;
}