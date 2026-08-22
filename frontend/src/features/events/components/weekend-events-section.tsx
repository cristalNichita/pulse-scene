import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { EventCard } from "@/features/events/components/event-card";
import type { EventPreview } from "@/features/events/types/event";

interface WeekendEventsSectionProps {
    events: EventPreview[];
}

export function WeekendEventsSection({
                                         events,
                                     }: WeekendEventsSectionProps) {
    return (
        <section
            id="weekend"
            className="overflow-hidden bg-paper py-28 text-ink md:py-36"
        >
            <Container>
                <SectionHeading
                    eyebrow="29–30 August"
                    title="This weekend"
                    description="No plans yet? Start here."
                    actionLabel="See the weekend"
                    actionHref="/events?date=this-weekend"
                    className="mb-12 md:mb-16"
                />

                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {events.map((event, index) => (
                        <div
                            key={event.id}
                            className={
                                index % 2 === 1
                                    ? "xl:translate-y-10"
                                    : undefined
                            }
                        >
                            <EventCard
                                event={event}
                                variant="portrait"
                            />
                        </div>
                    ))}
                </div>

                <Link
                    href="/events?date=this-weekend"
                    className="mt-16 flex items-center justify-between border-t border-ink/15 pt-5 text-sm font-medium md:hidden"
                >
                    See the weekend

                    <ArrowUpRight className="size-4" />
                </Link>
            </Container>
        </section>
    );
}