import type { EventDetails } from "@/features/events/types/event-details";
import type { EventPreview } from "@/features/events/types/event";
import { allDemoEvents } from "@/features/events/data/demo-events";

const eventDetailOverrides: Record<
    string,
    Partial<EventDetails>
> = {
    "electric-nights": {
        longDescription: [
            "Electric Nights brings together electronic music, visual art and open-air atmosphere for one late-summer night at Valea Morilor.",
            "The programme moves from warm sunset sets into deeper sounds after dark, while immersive light installations transform the space around the lake.",
            "Come early, stay late and expect a night built around music, movement and the city at its best.",
        ],

        rating: 4.9,
        reviewCount: 128,

        organizer: {
            id: 1,
            name: "Nocturne Collective",
            description:
                "Independent music and cultural events created around unexpected spaces in Chișinău.",
        },

        venueAddress:
            "Valea Morilor Park, Strada Grigore Alexandrescu, Chișinău",

        ageRestriction: "18+",

        gallery: [
            "/images/events/electric-nights.jpeg",
            "/images/events/electric-nights-2.jpg",
            "/images/events/electric-nights-3.jpeg",
        ],
    },
};

function createDefaultDetails(event: EventPreview): EventDetails {
    const override = eventDetailOverrides[event.slug];

    return {
        ...event,

        longDescription: override?.longDescription ?? [
            event.description,
            "Discover a carefully curated experience bringing together people, atmosphere and one of Chișinău's most interesting spaces.",
        ],

        rating: override?.rating ?? 4.8,
        reviewCount: override?.reviewCount ?? 64,

        organizer: override?.organizer ?? {
            id: event.id,
            name: `${event.venue.name} Events`,
            description:
                "Creating memorable events and experiences across Chișinău.",
        },

        venueAddress:
            override?.venueAddress ??
            `${event.venue.name}, ${event.venue.city}`,

        ageRestriction: override?.ageRestriction,

        gallery: override?.gallery ?? [event.imageUrl],
    };
}

export function getDemoEventBySlug(
    slug: string,
): EventDetails | undefined {
    const event = allDemoEvents.find(
        (item) => item.slug === slug,
    );

    if (!event) {
        return undefined;
    }

    return createDefaultDetails(event);
}