"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Container } from "@/components/ui/container";
import { DigitalTicket } from "@/features/booking/components/digital-ticket";
import { useBooking } from "@/features/booking/hooks/use-booking";

interface TicketPageContentProps {
    code: string;
}

export function TicketPageContent({
                                      code,
                                  }: TicketPageContentProps) {
    const {
        data: booking,
        isPending,
        isError,
    } = useBooking(code);

    if (isPending) {
        return (
            <main className="min-h-screen bg-canvas text-white">
                <Container>
                    <div className="flex min-h-screen items-center justify-center">
                        <div className="h-140 w-full max-w-xl animate-pulse rounded-panel bg-white/5" />
                    </div>
                </Container>
            </main>
        );
    }

    if (
        isError ||
        !booking
    ) {
        return (
            <main className="min-h-screen bg-canvas text-white">
                <Container>
                    <div className="flex min-h-screen flex-col items-center justify-center text-center">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">
                            Ticket unavailable
                        </p>

                        <h1 className="mt-4 text-5xl font-medium tracking-[-0.06em]">
                            We couldn&apos;t find this ticket.
                        </h1>

                        <Link
                            href="/tickets"
                            className="mt-8 rounded-pill bg-white px-6 py-3 text-sm font-semibold text-ink"
                        >
                            My tickets
                        </Link>
                    </div>
                </Container>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-canvas py-8 text-white sm:py-12">
            <Container>
                <header className="mb-12 flex items-center justify-between">
                    <Link
                        href={`/events/${booking.event.slug}`}
                        className="group flex items-center gap-3 text-sm text-white/50 transition-colors hover:text-white"
                    >
            <span className="flex size-10 items-center justify-center rounded-full border border-white/10 transition-colors group-hover:bg-white group-hover:text-ink">
              <ArrowLeft className="size-4" />
            </span>

                        Back to event
                    </Link>

                    <Link
                        href="/"
                        className="text-xl font-semibold tracking-[-0.07em]"
                    >
                        PULSE
                        <span className="text-accent">.</span>
                    </Link>
                </header>

                <div className="pb-16 pt-6 sm:pb-24 sm:pt-12">
                    <div className="mx-auto mb-10 max-w-xl text-center">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">
                            Your booking
                        </p>

                        <h1 className="mt-4 text-4xl font-medium tracking-[-0.055em] sm:text-5xl">
                            You&apos;re on the list.
                        </h1>

                        <p className="mt-4 text-sm leading-6 text-white/40">
                            Keep this ticket ready when you arrive.
                        </p>
                    </div>

                    <DigitalTicket
                        event={booking.event}
                        bookingCode={booking.code}
                        quantity={booking.quantity}
                    />
                </div>
            </Container>
        </main>
    );
}