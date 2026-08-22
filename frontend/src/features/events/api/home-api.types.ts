import type {
    EventApiCategory,
    EventApiPreview,
} from "@/features/events/api/event-api.types";

export interface HomeApiCategory
    extends EventApiCategory {
    description: string | null;
    image_url: string | null;
    event_count: number;
}

export interface HomeApiData {
    featured_event: EventApiPreview | null;

    trending_events: EventApiPreview[];
    weekend_events: EventApiPreview[];
    popular_events: EventApiPreview[];

    categories: HomeApiCategory[];
}