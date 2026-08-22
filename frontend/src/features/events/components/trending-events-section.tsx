import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { EventCard } from "@/features/events/components/event-card";
import type { EventPreview } from "@/features/events/types/event";

interface TrendingEventsSectionProps {
    events: EventPreview[];
}

export function TrendingEventsSection({
                                          events,
                                      }: TrendingEventsSectionProps) {
    const [primaryEvent, ...secondaryEvents] = events;

    if (!primaryEvent) {
        return null;
    }

    return (
        <section
            id="explore"
            className="bg-paper pb-28 pt-36 text-ink md:pb-36 md:pt-40"
        >
            <Container>
                <SectionHeading
                    eyebrow="Curated in Chișinău"
                    title="Trending this week"
                    actionLabel="View all events"
                    actionHref="/events"
                    className="mb-10 md:mb-14"
                />

                <div className="grid gap-5 lg:grid-cols-12 lg:auto-rows-75">
                    <EventCard
                        event={primaryEvent}
                        variant="featured"
                        className="lg:col-span-7 lg:row-span-2 lg:min-h-0"
                    />

                    {secondaryEvents.slice(0, 2).map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                            className="lg:col-span-5 lg:min-h-0"
                        />
                    ))}
                </div>

                <Link
                    href="/events"
                    className="mt-8 flex items-center justify-between border-t border-ink/15 pt-5 text-sm font-medium md:hidden"
                >
                    View all events

                    <ArrowUpRight className="size-4" />
                </Link>
            </Container>
        </section>
    );
}