"use client";

import Link from "next/link";
import {useEffect} from "react";
import {Heart, Search} from "lucide-react";
import {useRouter} from "next/navigation";

import {SiteFooter} from "@/components/layout/site-footer";
import {SiteHeader} from "@/components/layout/site-header";
import {Container} from "@/components/ui/container";
import {useAuth} from "@/features/auth/context/auth-context";
import {EventCard} from "@/features/events/components/event-card";
import {useFavorites} from "@/features/favorites/context/favorites-context";

export function FavoritesPageContent() {
    const router = useRouter();

    const {
        status,
    } = useAuth();

    const {
        favorites,
        isLoading,
    } = useFavorites();

    useEffect(() => {
        if (status === "guest") {
            router.replace(
                "/login?next=%2Ffavorites",
            );
        }
    }, [
        status,
        router,
    ]);

    if (
        status === "loading" ||
        status === "guest"
    ) {
        return (
            <main className="min-h-screen bg-canvas"/>
        );
    }

    return (
        <main>
            <section className="relative bg-canvas pb-20 pt-36 text-white md:pb-24 md:pt-44">
                <SiteHeader/>

                <Container>
                    <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">
                        Your Pulse
                    </p>

                    <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                        <div>
                            <h1 className="text-[clamp(4rem,9vw,8rem)] font-semibold uppercase leading-[0.8] tracking-[-0.075em]">
                                Saved
                                <span className="block text-accent">
                  events.
                </span>
                            </h1>

                            <p className="mt-8 max-w-lg text-sm leading-6 text-white/45 sm:text-base">
                                Everything that caught your eye,
                                kept together for later.
                            </p>
                        </div>

                        {!isLoading ? (
                            <p className="text-sm text-white/35">
                                {favorites.length}{" "}
                                {favorites.length === 1
                                    ? "saved event"
                                    : "saved events"}
                            </p>
                        ) : null}
                    </div>
                </Container>
            </section>

            <section className="min-h-162.5 bg-paper py-20 text-ink md:py-28">
                <Container>
                    {isLoading ? (
                        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                            {Array.from({
                                length: 6,
                            }).map((_, index) => (
                                <div
                                    key={index}
                                    className="min-h-115 animate-pulse rounded-card bg-ink/5"
                                />
                            ))}
                        </div>
                    ) : favorites.length > 0 ? (
                        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                            {favorites.map((event) => (
                                <EventCard
                                    key={event.id}
                                    event={event}
                                    variant="portrait"
                                />
                            ))}
                        </div>
                    ) : (
                        <div
                            className="flex min-h-120 flex-col items-center justify-center rounded-panel border border-dashed border-ink/15 px-6 text-center">
                            <div className="flex size-16 items-center justify-center rounded-full bg-ink text-white">
                                <Heart className="size-6"/>
                            </div>

                            <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/35">
                                Nothing saved yet
                            </p>

                            <h2 className="mt-3 text-4xl font-medium tracking-[-0.055em]">
                                Keep the good ones.
                            </h2>

                            <p className="mt-4 max-w-md text-sm leading-6 text-ink/45">
                                Tap the heart on any event and
                                it&apos;ll show up here.
                            </p>

                            <Link
                                href="/events"
                                className="mt-8 flex items-center gap-3 rounded-pill bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                            >
                                <Search className="size-4"/>

                                Explore events
                            </Link>
                        </div>
                    )}
                </Container>
            </section>

            <SiteFooter/>
        </main>
    );
}