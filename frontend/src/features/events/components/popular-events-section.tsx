"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import type { EventPreview } from "@/features/events/types/event";
import {
    formatEventCardDate,
    formatPriceFrom,
} from "@/lib/formatters";
import { cn } from "@/lib/cn";

interface PopularEventsSectionProps {
    events: EventPreview[];
}

export function PopularEventsSection({
                                         events,
                                     }: PopularEventsSectionProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    if (events.length === 0) {
        return null;
    }

    return (
        <section className="bg-canvas py-28 text-white md:py-36">
            <Container>
                <div className="mb-12 flex items-end justify-between gap-8 md:mb-16">
                    <div>
                        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
                            Around the city
                        </p>

                        <h2 className="text-4xl font-medium tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                            Popular in Chișinău
                        </h2>
                    </div>

                    <p className="hidden max-w-xs text-right text-sm leading-6 text-white/40 lg:block">
                        The events people are saving, sharing and booking right now.
                    </p>
                </div>

                <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(420px,0.85fr)] lg:gap-16">
                    <div className="relative min-h-130 overflow-hidden rounded-panel sm:min-h-155">
                        {events.map((event, index) => (
                            <Image
                                key={event.id}
                                src={event.imageUrl}
                                alt={event.title}
                                fill
                                sizes="(min-width: 1024px) 58vw, 100vw"
                                priority={index === 0}
                                className={cn(
                                    "object-cover transition-all duration-700 ease-smooth",
                                    index === activeIndex
                                        ? "scale-100 opacity-100"
                                        : "scale-[1.03] opacity-0",
                                )}
                            />
                        ))}

                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/10" />

                        <div className="absolute bottom-6 left-6 rounded-pill border border-white/15 bg-black/20 px-4 py-2 text-xs font-medium backdrop-blur-md sm:bottom-8 sm:left-8">
                            {events[activeIndex].category.name}
                        </div>
                    </div>

                    <div className="flex flex-col border-t border-white/15">
                        {events.map((event, index) => {
                            const isActive = activeIndex === index;

                            return (
                                <Link
                                    key={event.id}
                                    href={`/events/${event.slug}`}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    onFocus={() => setActiveIndex(index)}
                                    className="group relative border-b border-white/15 py-7 sm:py-8"
                                >
                                    <div className="grid grid-cols-[42px_minmax(0,1fr)_auto] items-start gap-5">
                    <span
                        className={cn(
                            "pt-1 text-xs font-medium tracking-[0.18em] transition-colors duration-300",
                            isActive
                                ? "text-accent"
                                : "text-white/30",
                        )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                                        <div>
                                            <div className="mb-2 flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
                        <span>
                          {formatEventCardDate(event.startsAt)}
                        </span>

                                                <span>·</span>

                                                <span>
                          {event.category.name}
                        </span>
                                            </div>

                                            <h3
                                                className={cn(
                                                    "text-2xl font-medium leading-tight tracking-[-0.045em] transition-colors duration-300 sm:text-3xl",
                                                    isActive
                                                        ? "text-white"
                                                        : "text-white/60 group-hover:text-white",
                                                )}
                                            >
                                                {event.title}
                                            </h3>

                                            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/35">
                        <span>
                          {event.venue.name}
                        </span>

                                                <span className="text-white/15">
                          ·
                        </span>

                                                <span>
                          {formatPriceFrom(event.priceFrom)}
                        </span>
                                            </div>
                                        </div>

                                        <span
                                            className={cn(
                                                "mt-1 flex size-10 items-center justify-center rounded-pill border transition-all duration-300",
                                                isActive
                                                    ? "border-white bg-white text-ink"
                                                    : "border-white/15 text-white/45 group-hover:border-white/40 group-hover:text-white",
                                            )}
                                        >
                      <ArrowUpRight className="size-4 transition-transform duration-300 ease-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </section>
    );
}