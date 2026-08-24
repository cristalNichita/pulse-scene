import type { EventPreview } from "@/features/events/types/event";
import type { Review } from "@/features/reviews/types/review";

export interface EventOrganizer {
    id: number;
    name: string;
    description: string;
}

export interface EventDetails extends EventPreview {
    longDescription: string[];

    rating: number;
    reviewCount: number;

    organizer: EventOrganizer;

    venueAddress: string;

    ageRestriction?: string;

    gallery: string[];

    reviews: Review[];
}