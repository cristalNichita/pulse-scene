import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import { DigitalTicket } from "@/features/booking/components/digital-ticket";
import { getEventBySlug } from "@/features/events/api/events-api";
import { ApiError } from "@/lib/api/api-error";

interface TicketPageProps {
    params: Promise<{
        code: string;
    }>;

    searchParams: Promise<{
        event?: string;
        quantity?: string;
    }>;
}

export default async function TicketPage({
                                             params,
                                             searchParams,
                                         }: TicketPageProps) {
    const { code } = await params;
    const query = await searchParams;

    if (!query.event) {
        notFound();
    }

    let event;

    try {
        event = await getEventBySlug(
            query.event,
        );
    } catch (error) {
        if (
            error instanceof ApiError &&
            error.status === 404
        ) {
            notFound();
        }

        throw error;
    }

    const requestedQuantity = Number(
        query.quantity ?? 1,
    );

    const quantity = Number.isFinite(
        requestedQuantity,
    )
        ? Math.min(
            8,
            Math.max(1, requestedQuantity),
        )
        : 1;

    return (
        <main className="min-h-screen bg-canvas py-8 text-white sm:py-12">
            <Container>
                <header className="mb-12 flex items-center justify-between">
                    <Link
                        href={`/events/${event.slug}`}
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

                        <h2 className="mt-4 text-4xl font-medium tracking-[-0.055em] sm:text-5xl">
                            You&apos;re on the list.
                        </h2>

                        <p className="mt-4 text-sm leading-6 text-white/40">
                            Keep this ticket ready when you arrive.
                        </p>
                    </div>

                    <DigitalTicket
                        event={event}
                        bookingCode={code}
                        quantity={quantity}
                    />
                </div>
            </Container>
        </main>
    );
}