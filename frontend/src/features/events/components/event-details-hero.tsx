import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    Heart,
    MapPin,
} from "lucide-react";

import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/ui/container";
import type { EventDetails } from "@/features/events/types/event-details";
import {
    formatEventLongDate,
    formatEventTime,
} from "@/lib/formatters";

interface EventDetailsHeroProps {
    event: EventDetails;
}

export function EventDetailsHero({
                                     event,
                                 }: EventDetailsHeroProps) {
    return (
        <section className="relative min-h-190 overflow-hidden bg-canvas md:h-[82svh] md:max-h-225">
            <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
            />

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.5)_0%,rgba(5,5,5,0.08)_38%,rgba(5,5,5,0.92)_100%)]" />

            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.45)_0%,transparent_65%)]" />

            <SiteHeader />

            <Container className="relative z-10 flex min-h-190 flex-col justify-end pb-14 pt-32 md:h-full md:min-h-0 md:pb-16">
                <div className="mb-auto flex items-center justify-between pt-8">
                    <Link
                        href="/"
                        className="group flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-white"
                    >
            <span className="flex size-10 items-center justify-center rounded-pill border border-white/15 bg-black/10 backdrop-blur-md transition-colors group-hover:bg-white group-hover:text-ink">
              <ArrowLeft className="size-4" />
            </span>

                        Back to explore
                    </Link>

                    <button
                        type="button"
                        aria-label={`Save ${event.title}`}
                        className="flex size-11 items-center justify-center rounded-pill border border-white/15 bg-black/15 text-white backdrop-blur-md transition-all hover:border-white hover:bg-white hover:text-ink"
                    >
                        <Heart className="size-4.5" />
                    </button>
                </div>

                <div>
                    <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="rounded-pill bg-accent px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em]">
              {event.category.name}
            </span>

                        <span className="text-xs font-medium uppercase tracking-[0.16em] text-white/50">
              {formatEventLongDate(event.startsAt)}
            </span>
                    </div>

                    <h1 className="max-w-275 text-[clamp(4rem,9vw,9rem)] font-semibold uppercase leading-[0.79] tracking-[-0.075em]">
                        {event.title}
                    </h1>

                    <div className="mt-8 flex flex-col gap-5 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <p className="font-editorial text-2xl italic text-white/85 sm:text-3xl">
                            {event.subtitle}
                        </p>

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/55">
              <span>
                {formatEventTime(event.startsAt)}
              </span>

                            <span className="hidden size-1 rounded-full bg-white/30 sm:block" />

                            <span className="flex items-center gap-2">
                <MapPin className="size-4" />

                                {event.venue.name}, {event.venue.city}
              </span>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}