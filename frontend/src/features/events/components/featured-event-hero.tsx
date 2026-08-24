import Image from "next/image";
import Link from "next/link";
import {ArrowUpRight} from "lucide-react";

import {SiteHeader} from "@/components/layout/site-header";
import {buttonVariants} from "@/components/ui/button";
import {Container} from "@/components/ui/container";
import {DiscoveryBar} from "@/features/events/components/discovery-bar";
import { FavoriteButton } from "@/features/favorites/components/favorite-button";
import type {EventPreview} from "@/features/events/types/event";
import {
    formatEventDay,
    formatEventMonth,
} from "@/lib/formatters";

interface FeaturedEventHeroProps {
    event: EventPreview;
}

export function FeaturedEventHero({
                                      event,
                                  }: FeaturedEventHeroProps) {
    const day = formatEventDay(event.startsAt);
    const month = formatEventMonth(event.startsAt);

    return (
        <section
            className="relative min-h-212.5 overflow-visible bg-canvas md:h-svh md:max-h-245 md:min-h-190">
            <div className="absolute inset-0 overflow-hidden">
                <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                />

                <div
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,7,0.44)_0%,rgba(7,7,7,0.05)_30%,rgba(7,7,7,0.22)_55%,rgba(7,7,7,0.94)_100%)]"/>

                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,7,7,0.52)_0%,rgba(7,7,7,0.06)_62%)]"/>

                <div className="absolute right-[5%] top-[10%] h-[55%] w-[45%] rounded-full bg-accent/15 blur-[140px]"/>
            </div>

            <SiteHeader/>

            <Container
                className="relative z-10 flex min-h-212.5 flex-col justify-end pb-44 pt-32 md:h-full md:min-h-0 md:pb-32 lg:pb-36">
                <div className="mb-8 flex items-end justify-between gap-10">
                    <div className="flex items-center gap-3">
            <span className="rounded-pill bg-accent px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.15em]">
              Featured
            </span>

                        <span className="text-xs font-medium uppercase tracking-[0.16em] text-white/55">
              {event.category.name} · Open Air
            </span>
                    </div>

                    <FavoriteButton event={event} />
                </div>

                <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
                    <div>
                        <h1 className="max-w-5xl text-[clamp(4.7rem,11vw,10.5rem)] font-semibold uppercase leading-[0.73] tracking-[-0.075em]">
                            {event.title.split(" ").map((word) => (
                                <span
                                    key={word}
                                    className="block"
                                >
                  {word}
                </span>
                            ))}
                        </h1>

                        <div className="mt-8 flex flex-wrap items-end gap-x-8 gap-y-3">
                            <p className="font-editorial text-2xl font-medium italic text-white/90 sm:text-3xl">
                                {event.subtitle}
                            </p>

                            <p className="pb-1 text-sm text-white/50">
                                {event.venue.name} · {event.venue.city}
                            </p>
                        </div>
                    </div>

                    <aside className="flex flex-col items-start lg:items-end">
                        <div className="mb-8 flex items-center gap-5 lg:flex-col lg:items-end lg:gap-0">
              <span className="text-[5rem] font-medium leading-none tracking-[-0.08em] sm:text-[6rem]">
                {day}
              </span>

                            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
                {month}
              </span>
                        </div>

                        <p className="mb-7 max-w-[320px] text-sm leading-6 text-white/55 lg:text-right">
                            {event.description}
                        </p>

                        <Link
                            href={`/events/${event.slug}`}
                            className={buttonVariants({
                                variant: "light",
                                size: "lg",
                                className: "group gap-5 pr-3",
                            })}
                        >
                            Get tickets

                            <span
                                className="flex size-10 items-center justify-center rounded-pill bg-ink text-white transition-colors duration-300 group-hover:bg-accent">
                <ArrowUpRight className="size-4.5"/>
              </span>
                        </Link>
                    </aside>
                </div>
            </Container>

            <DiscoveryBar/>
        </section>
    );
}