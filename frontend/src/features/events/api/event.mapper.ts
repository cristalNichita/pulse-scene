import type {
    EventApiDetails,
    EventApiPreview,
} from "@/features/events/api/event-api.types";
import type { EventDetails } from "@/features/events/types/event-details";
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

export function mapEventDetails(
    event: EventApiDetails,
): EventDetails {
    const longDescription = event.content
        ? event.content
            .split(/\n\s*\n/)
            .map((paragraph) => paragraph.trim())
            .filter(Boolean)
        : [event.description];

    return {
        ...mapEventPreview(event),

        longDescription,

        rating: event.rating,
        reviewCount: event.review_count,

        organizer: {
            id: event.organizer.id,
            name: event.organizer.name,
            description:
                event.organizer.description ?? "",
        },

        venueAddress:
            event.venue.address ??
            `${event.venue.name}, ${event.venue.city}`,

        ageRestriction:
            event.minimum_age !== null
                ? `${event.minimum_age}+`
                : undefined,

        gallery: event.gallery.map(
            (image) => image.url,
        ),

        reviews: event.reviews.map(
            (review) => ({
                id: review.id,

                rating: review.rating,
                body: review.body,

                author: {
                    id: review.author.id,
                    name: review.author.name,
                },

                createdAt: review.created_at,
            }),
        ),
    };
}