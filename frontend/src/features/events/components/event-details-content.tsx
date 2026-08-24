import {
    CalendarDays,
    MapPin,
    Star,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { BookingFlow } from "@/features/booking/components/booking-flow";
import { EventGallery } from "@/features/events/components/event-gallery";
import { EventReviewsSection } from "@/features/reviews/components/event-reviews-section";
import type { EventDetails } from "@/features/events/types/event-details";
import {
    formatEventLongDate,
    formatEventTime,
} from "@/lib/formatters";

interface EventDetailsContentProps {
    event: EventDetails;
}

export function EventDetailsContent({
                                        event,
                                    }: EventDetailsContentProps) {
    return (
        <section className="bg-paper py-16 text-ink md:py-24">
            <Container>
                <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-20">
                    <div>
                        <div className="grid gap-7 border-b border-ink/10 pb-10 sm:grid-cols-2 xl:grid-cols-3">
                            <div className="flex gap-4">
                                <CalendarDays className="mt-1 size-5 shrink-0 text-accent" />

                                <div>
                                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-ink/35">
                                        Date & time
                                    </p>

                                    <p className="text-sm font-medium">
                                        {formatEventLongDate(event.startsAt)}
                                    </p>

                                    <p className="mt-1 text-sm text-ink/45">
                                        {formatEventTime(event.startsAt)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <MapPin className="mt-1 size-5 shrink-0 text-accent" />

                                <div>
                                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-ink/35">
                                        Location
                                    </p>

                                    <p className="text-sm font-medium">
                                        {event.venue.name}
                                    </p>

                                    <p className="mt-1 max-w-60 text-sm leading-5 text-ink/45">
                                        {event.venueAddress}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Star className="mt-1 size-5 shrink-0 fill-accent text-accent" />

                                <div>
                                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-ink/35">
                                        Guest rating
                                    </p>

                                    <p className="text-sm font-medium">
                                        {event.rating} / 5
                                    </p>

                                    <p className="mt-1 text-sm text-ink/45">
                                        {event.reviewCount} reviews
                                    </p>
                                </div>
                            </div>
                        </div>

                        <section className="py-12 md:py-16">
                            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/35">
                                About the event
                            </p>

                            <h2 className="max-w-2xl text-4xl font-medium leading-[1.02] tracking-[-0.055em] sm:text-5xl">
                                One night.
                                <br />
                                A different side of the city.
                            </h2>

                            <div className="mt-10 max-w-3xl space-y-5">
                                {event.longDescription.map((paragraph) => (
                                    <p
                                        key={paragraph}
                                        className="text-base leading-7 text-ink/60 sm:text-[17px] sm:leading-8"
                                    >
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                            {event.ageRestriction ? (
                                <div className="mt-10 inline-flex rounded-pill border border-ink/10 px-4 py-2 text-xs font-medium text-ink/50">
                                    {event.ageRestriction} event
                                </div>
                            ) : null}
                        </section>

                        <section className="border-y border-ink/10 py-10">
                            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/35">
                                Organized by
                            </p>

                            <div className="flex items-center gap-5">
                                <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-ink text-lg font-semibold text-white">
                                    {event.organizer.name.charAt(0)}
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold tracking-tight">
                                        {event.organizer.name}
                                    </h3>

                                    <p className="mt-1 max-w-lg text-sm leading-6 text-ink/45">
                                        {event.organizer.description}
                                    </p>
                                </div>
                            </div>
                        </section>

                        <EventGallery
                            images={event.gallery}
                            title={event.title}
                        />
                    </div>

                    <BookingFlow event={event} />
                </div>
                <EventReviewsSection event={event} />
            </Container>
        </section>
    );
}