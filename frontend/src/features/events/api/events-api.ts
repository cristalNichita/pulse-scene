import { cache } from "react";

import type {
    EventApiDetails,
    EventApiPreview,
} from "@/features/events/api/event-api.types";
import {
    mapEventDetails,
    mapEventPreview,
} from "@/features/events/api/event.mapper";
import type { EventDetails } from "@/features/events/types/event-details";
import type { EventPreview } from "@/features/events/types/event";
import { apiGet } from "@/lib/api/client";
import type {
    ApiDataResponse,
    PaginatedApiResponse,
} from "@/lib/api/types";

interface EventListOptions {
    perPage?: number;
}

export interface EventListResult {
    events: EventPreview[];
    total: number;
    currentPage: number;
    lastPage: number;
}

export async function getEvents(
    options: EventListOptions = {},
): Promise<EventListResult> {
    const params = new URLSearchParams();

    if (options.perPage) {
        params.set(
            "per_page",
            String(options.perPage),
        );
    }

    const query = params.toString();

    const response = await apiGet<
        PaginatedApiResponse<EventApiPreview>
    >(
        query
            ? `/events?${query}`
            : "/events",
    );

    return {
        events: response.data.map(
            mapEventPreview,
        ),

        total: response.meta.total,
        currentPage: response.meta.current_page,
        lastPage: response.meta.last_page,
    };
}

export const getEventBySlug = cache(
    async (
        slug: string,
    ): Promise<EventDetails> => {
        const response = await apiGet<
            ApiDataResponse<EventApiDetails>
        >(`/events/${encodeURIComponent(slug)}`);

        return mapEventDetails(response.data);
    },
);