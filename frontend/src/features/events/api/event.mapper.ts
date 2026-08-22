import type { EventApiPreview } from "@/features/events/api/event-api.types";
import type { EventPreview } from "@/features/events/types/event";

export function mapEventPreview(
    event: EventApiPreview,
): EventPreview {
    return {
        id: event.id,
        slug: event.slug,

        title: event.title,
        subtitle: event.subtitle ?? "",
        description: event.description,

        startsAt: event.starts_at,

        priceFrom: event.price_from,

        imageUrl: event.image_url,

        category: {
            id: event.category.id,
            name: event.category.name,
            slug: event.category.slug,
        },

        venue: {
            id: event.venue.id,
            name: event.venue.name,
            city: event.venue.city,
        },

        isFeatured: event.is_featured,
    };
}