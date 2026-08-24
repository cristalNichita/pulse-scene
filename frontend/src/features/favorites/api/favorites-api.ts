import type { EventApiPreview } from "@/features/events/api/event-api.types";
import { mapEventPreview } from "@/features/events/api/event.mapper";
import type { EventPreview } from "@/features/events/types/event";
import { browserApiRequest } from "@/lib/api/browser-client";
import type { PaginatedApiResponse } from "@/lib/api/types";

export async function getFavorites(): Promise<
    EventPreview[]
> {
    const response =
        await browserApiRequest<
            PaginatedApiResponse<EventApiPreview>
        >("/api/v1/me/favorites");

    return response.data.map(
        mapEventPreview,
    );
}

export async function addFavorite(
    slug: string,
): Promise<void> {
    await browserApiRequest(
        `/api/v1/events/${encodeURIComponent(slug)}/favorite`,
        {
            method: "POST",
        },
    );
}

export async function removeFavorite(
    slug: string,
): Promise<void> {
    await browserApiRequest(
        `/api/v1/events/${encodeURIComponent(slug)}/favorite`,
        {
            method: "DELETE",
        },
    );
}