export interface EventApiCategory {
    id: number;
    name: string;
    slug: string;
}

export interface EventApiVenue {
    id: number;
    name: string;
    slug: string;
    city: string;
    country: string;
    address: string | null;
}

export interface EventApiPreview {
    id: number;
    slug: string;

    title: string;
    subtitle: string | null;
    description: string;

    starts_at: string;
    ends_at: string | null;

    price_from: number;
    currency: string;

    image_url: string;

    category: EventApiCategory;
    venue: EventApiVenue;

    is_featured: boolean;
}