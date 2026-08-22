import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

import type { EventPreview } from "@/features/events/types/event";
import { cn } from "@/lib/cn";
import {
    formatEventCardDate,
    formatPriceFrom,
} from "@/lib/formatters";

type EventCardVariant =
    | "featured"
    | "standard"
    | "portrait";

interface EventCardProps {
    event: EventPreview;
    variant?: EventCardVariant;
    className?: string;
}

export function EventCard({
                              event,
                              variant = "standard",
                              className,
                          }: EventCardProps) {
    return (
        <article
            className={cn(
                "group relative isolate h-full overflow-hidden rounded-card bg-canvas",
                variant === "featured" && "min-h-125",
                variant === "standard" && "min-h-85",
                variant === "portrait" && "min-h-115",
                className,
            )}
        >
            <Link
                href={`/events/${event.slug}`}
                className="relative block h-full w-full"
            >
                <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    sizes={
                        variant === "featured"
                            ? "(min-width: 1024px) 58vw, 100vw"
                            : variant === "portrait"
                                ? "(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                                : "(min-width: 1024px) 42vw, 100vw"
                    }
                    className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.035]"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/15 to-black/10" />

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                    <div className="mb-3 flex items-center gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
              {event.category.name}
            </span>

                        <span className="size-1 rounded-full bg-accent" />

                        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
              {formatEventCardDate(event.startsAt)}
            </span>
                    </div>

                    <h3
                        className={cn(
                            "max-w-[90%] font-medium leading-[0.98] tracking-tighter text-white",
                            variant === "featured"
                                ? "text-4xl sm:text-5xl lg:text-6xl"
                                : variant === "portrait"
                                    ? "text-3xl lg:text-[2.15rem]"
                                    : "text-3xl sm:text-4xl",
                        )}
                    >
                        {event.title}
                    </h3>

                    <div className="mt-5 flex items-end justify-between gap-6">
                        <p className="text-sm text-white/60">
                            {event.venue.name}
                            <span className="mx-2 text-white/25">·</span>
                            {event.venue.city}
                        </p>

                        <span className="shrink-0 text-sm font-medium text-white">
              {formatPriceFrom(event.priceFrom)}
            </span>
                    </div>
                </div>
            </Link>

            <button
                type="button"
                aria-label={`Save ${event.title}`}
                className="absolute right-5 top-5 z-20 flex size-11 items-center justify-center rounded-pill border border-white/20 bg-black/15 text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white hover:text-ink"
            >
                <Heart className="size-4.5" />
            </button>
        </article>
    );
}