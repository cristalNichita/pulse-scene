import type { EventFilters } from "@/features/events/types/event-filters";
import type { EventPreview } from "@/features/events/types/event";

const EVENT_TIME_ZONE = "Europe/Chisinau";

function normalize(value: string) {
    return value
        .trim()
        .toLocaleLowerCase();
}

function getDateKey(date: Date | string) {
    return new Intl.DateTimeFormat("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: EVENT_TIME_ZONE,
    }).format(
        typeof date === "string"
            ? new Date(date)
            : date,
    );
}

function isWeekend(date: string) {
    const weekday = new Intl.DateTimeFormat("en", {
        weekday: "short",
        timeZone: EVENT_TIME_ZONE,
    }).format(new Date(date));

    return weekday === "Sat" || weekday === "Sun";
}

export function filterEvents(
    events: EventPreview[],
    filters: EventFilters,
) {
    const search = normalize(filters.search);

    return events
        .filter((event) => {
            if (!search) {
                return true;
            }

            const searchableContent = [
                event.title,
                event.subtitle,
                event.description,
                event.category.name,
                event.venue.name,
                event.venue.city,
            ]
                .map(normalize)
                .join(" ");

            return searchableContent.includes(search);
        })
        .filter((event) => {
            if (filters.category === "all") {
                return true;
            }

            return event.category.slug === filters.category;
        })
        .filter((event) => {
            if (filters.location === "all") {
                return true;
            }

            return normalize(event.venue.city) === normalize(filters.location);
        })
        .filter((event) => {
            if (filters.price === "any") {
                return true;
            }

            if (filters.price === "free") {
                return event.priceFrom === 0;
            }

            return event.priceFrom > 0;
        })
        .filter((event) => {
            if (filters.date === "anytime") {
                return true;
            }

            if (filters.date === "today") {
                return getDateKey(event.startsAt) === getDateKey(new Date());
            }

            return isWeekend(event.startsAt);
        })
        .sort(
            (first, second) =>
                new Date(first.startsAt).getTime() -
                new Date(second.startsAt).getTime(),
        );
}