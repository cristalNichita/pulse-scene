"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowUpRight,
    Ticket,
} from "lucide-react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/ui/container";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { BookingTicketCard } from "@/features/booking/components/booking-ticket-card";
import { useBookings } from "@/features/booking/hooks/use-bookings";

export function MyTicketsPageContent() {
    const router = useRouter();

    const {
        data: user,
        isPending: isAuthPending,
    } = useCurrentUser();

    const {
        bookings,
        isLoading,
    } = useBookings();

    useEffect(() => {
        if (
            !isAuthPending &&
            !user
        ) {
            router.replace(
                "/login?next=%2Ftickets",
            );
        }
    }, [
        isAuthPending,
        user,
        router,
    ]);

    if (
        isAuthPending ||
        !user
    ) {
        return (
            <main className="min-h-screen bg-canvas" />
        );
    }

    const activeBookings =
        bookings.filter(
            (booking) =>
                booking.status ===
                "confirmed",
        );

    const cancelledBookings =
        bookings.filter(
            (booking) =>
                booking.status ===
                "cancelled",
        );

    return (
        <main>
            <section className="relative bg-canvas pb-20 pt-36 text-white md:pb-28 md:pt-44">
                <SiteHeader />

                <Container>
                    <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">
                        Your bookings
                    </p>

                    <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                        <div>
                            <h1 className="text-[clamp(4rem,9vw,8rem)] font-semibold uppercase leading-[0.8] tracking-[-0.075em]">
                                Your
                                <span className="block text-accent">
                  tickets.
                </span>
                            </h1>

                            <p className="mt-8 max-w-lg text-sm leading-6 text-white/45 sm:text-base">
                                Everything you&apos;ve booked,
                                ready when you need it.
                            </p>
                        </div>

                        {!isLoading ? (
                            <p className="text-sm text-white/35">
                                {activeBookings.length} active{" "}
                                {activeBookings.length === 1
                                    ? "booking"
                                    : "bookings"}
                            </p>
                        ) : null}
                    </div>
                </Container>
            </section>

            <section className="min-h-162.5 bg-paper py-20 text-ink md:py-28">
                <Container>
                    {isLoading ? (
                        <div className="space-y-5">
                            {Array.from({
                                length: 3,
                            }).map((_, index) => (
                                <div
                                    key={index}
                                    className="h-75 animate-pulse rounded-panel bg-ink/5"
                                />
                            ))}
                        </div>
                    ) : bookings.length === 0 ? (
                        <div className="flex min-h-120 flex-col items-center justify-center rounded-panel border border-dashed border-ink/15 px-6 text-center">
                            <div className="flex size-16 items-center justify-center rounded-full bg-ink text-white">
                                <Ticket className="size-6" />
                            </div>

                            <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/35">
                                No tickets yet
                            </p>

                            <h2 className="mt-3 text-4xl font-medium tracking-[-0.055em]">
                                Your next plan starts here.
                            </h2>

                            <p className="mt-4 max-w-md text-sm leading-6 text-ink/45">
                                Find something worth leaving the
                                house for and your ticket will
                                show up here.
                            </p>

                            <Link
                                href="/events"
                                className="mt-8 flex items-center gap-2 rounded-pill bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-hover"
                            >
                                Explore events

                                <ArrowUpRight className="size-4" />
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-20">
                            <section>
                                <div className="mb-8 flex items-end justify-between border-b border-ink/10 pb-5">
                                    <div>
                                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/35">
                                            Ready to go
                                        </p>

                                        <h2 className="mt-2 text-3xl font-medium tracking-tighter">
                                            Upcoming
                                        </h2>
                                    </div>

                                    <span className="text-sm text-ink/35">
                    {activeBookings.length}
                  </span>
                                </div>

                                {activeBookings.length > 0 ? (
                                    <div className="space-y-5">
                                        {activeBookings.map(
                                            (booking) => (
                                                <BookingTicketCard
                                                    key={booking.id}
                                                    booking={booking}
                                                />
                                            ),
                                        )}
                                    </div>
                                ) : (
                                    <p className="py-12 text-sm text-ink/40">
                                        No active bookings.
                                    </p>
                                )}
                            </section>

                            {cancelledBookings.length > 0 ? (
                                <section>
                                    <div className="mb-8 flex items-end justify-between border-b border-ink/10 pb-5">
                                        <div>
                                            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/35">
                                                History
                                            </p>

                                            <h2 className="mt-2 text-3xl font-medium tracking-tighter">
                                                Cancelled
                                            </h2>
                                        </div>

                                        <span className="text-sm text-ink/35">
                      {cancelledBookings.length}
                    </span>
                                    </div>

                                    <div className="space-y-5">
                                        {cancelledBookings.map(
                                            (booking) => (
                                                <BookingTicketCard
                                                    key={booking.id}
                                                    booking={booking}
                                                />
                                            ),
                                        )}
                                    </div>
                                </section>
                            ) : null}
                        </div>
                    )}
                </Container>
            </section>

            <SiteFooter />
        </main>
    );
}