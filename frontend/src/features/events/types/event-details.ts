import type { EventPreview } from "@/features/events/types/event";

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
}