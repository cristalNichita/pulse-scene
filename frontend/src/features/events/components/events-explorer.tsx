"use client";

import {
    useEffect,
    useMemo,
    useState,
} from "react";
import {
    usePathname,
    useRouter,
} from "next/navigation";

import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/ui/container";
import { EventFiltersBar } from "@/features/events/components/event-filters-bar";
import { EventsResults } from "@/features/events/components/events-results";
import { filterEvents } from "@/features/events/lib/filter-events";
import type { EventPreview } from "@/features/events/types/event";
import type { EventFilters } from "@/features/events/types/event-filters";

interface EventsExplorerProps {
    events: EventPreview[];
    initialFilters: EventFilters;
}

const defaultFilters: EventFilters = {
    search: "",
    category: "all",
    location: "all",
    date: "anytime",
    price: "any",
};

export function EventsExplorer({
                                   events,
                                   initialFilters,
                               }: EventsExplorerProps) {
    const router = useRouter();
    const pathname = usePathname();

    const [filters, setFilters] =
        useState<EventFilters>(initialFilters);

    const categories = useMemo(() => {
        const items = new Map<string, string>();

        events.forEach((event) => {
            items.set(
                event.category.slug,
                event.category.name,
            );
        });

        return Array.from(items)
            .map(([value, label]) => ({
                value,
                label,
            }))
            .sort((first, second) =>
                first.label.localeCompare(second.label),
            );
    }, [events]);

    const locations = useMemo(() => {
        return Array.from(
            new Set(
                events.map((event) => event.venue.city),
            ),
        )
            .sort()
            .map((location) => ({
                value: location,
                label: location,
            }));
    }, [events]);

    const filteredEvents = useMemo(
        () => filterEvents(events, filters),
        [events, filters],
    );

    useEffect(() => {
        const params = new URLSearchParams();

        if (filters.search.trim()) {
            params.set("search", filters.search.trim());
        }

        if (filters.category !== "all") {
            params.set("category", filters.category);
        }

        if (filters.location !== "all") {
            params.set("location", filters.location);
        }

        if (filters.date !== "anytime") {
            params.set("date", filters.date);
        }

        if (filters.price !== "any") {
            params.set("price", filters.price);
        }

        const query = params.toString();

        router.replace(
            query
                ? `${pathname}?${query}`
                : pathname,
            {
                scroll: false,
            },
        );
    }, [
        filters,
        pathname,
        router,
    ]);

    function updateFilter<
        Key extends keyof EventFilters,
    >(
        key: Key,
        value: EventFilters[Key],
    ) {
        setFilters((current) => ({
            ...current,
            [key]: value,
        }));
    }

    function resetFilters() {
        setFilters(defaultFilters);
    }

    return (
        <main>
            <section className="relative bg-canvas pb-20 pt-32 text-white md:pb-24 md:pt-40">
                <SiteHeader />

                <Container>
                    <div className="max-w-5xl">
                        <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">
                            Explore Pulse
                        </p>

                        <h1 className="text-[clamp(4rem,9vw,8.5rem)] font-semibold leading-[0.82] tracking-[-0.075em]">
                            FIND YOUR
                            <span className="block text-accent">
                NEXT THING.
              </span>
                        </h1>

                        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <p className="max-w-lg text-sm leading-6 text-white/45 sm:text-base sm:leading-7">
                                Concerts, culture, food, workshops and nights
                                worth leaving the house for.
                            </p>

                            <p className="text-sm text-white/35">
                                {events.length} events in Chișinău
                            </p>
                        </div>
                    </div>

                    <div className="-mb-36 mt-14">
                        <EventFiltersBar
                            filters={filters}
                            categories={categories}
                            locations={locations}
                            onChange={updateFilter}
                            onReset={resetFilters}
                        />
                    </div>
                </Container>
            </section>

            <section className="min-h-175 bg-paper pb-32 pt-44 text-ink">
                <Container>
                    <div className="mb-10 flex items-end justify-between border-b border-ink/10 pb-6">
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/35">
                                Discover
                            </p>

                            <h2 className="mt-2 text-3xl font-medium tracking-[-0.045em] sm:text-4xl">
                                {filteredEvents.length === events.length
                                    ? "All events"
                                    : "Your results"}
                            </h2>
                        </div>

                        <p className="text-sm text-ink/40">
                            {filteredEvents.length}{" "}
                            {filteredEvents.length === 1
                                ? "event"
                                : "events"}
                        </p>
                    </div>

                    <EventsResults
                        events={filteredEvents}
                        onReset={resetFilters}
                    />
                </Container>
            </section>
        </main>
    );
}