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

export interface EventApiOrganizer {
    id: number;
    name: string;
    slug: string;
    description: string | null;
}

export interface EventApiGalleryImage {
    id: number;
    url: string;
    position: number;
}

export interface EventApiReview {
    id: number;
    rating: number;
    body: string | null;

    author: {
        id: number;
        name: string;
    };

    created_at: string;
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

export interface EventApiDetails extends EventApiPreview {
    content: string | null;

    capacity: number | null;
    minimum_age: number | null;

    rating: number;
    review_count: number;

    organizer: EventApiOrganizer;

    gallery: EventApiGalleryImage[];
    reviews: EventApiReview[];
}