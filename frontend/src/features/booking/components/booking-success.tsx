"use client";

import Link from "next/link";
import {
    ArrowUpRight,
    Check,
    X,
} from "lucide-react";

import type { EventDetails } from "@/features/events/types/event-details";

interface BookingSuccessProps {
    event: EventDetails;
    bookingCode: string;
    quantity: number;
    isOpen: boolean;
    onClose: () => void;
}

export function BookingSuccess({
                                   event,
                                   bookingCode,
                                   quantity,
                                   isOpen,
                                   onClose,
                               }: BookingSuccessProps) {
    if (!isOpen) {
        return null;
    }

    const ticketHref =
        `/tickets/${bookingCode}` +
        `?event=${encodeURIComponent(event.slug)}` +
        `&quantity=${quantity}`;

    return (
        <div className="fixed inset-0 z-110 flex items-center justify-center p-5">
            <button
                type="button"
                aria-label="Close confirmation"
                onClick={onClose}
                className="absolute inset-0 bg-black/65 backdrop-blur-md"
            />

            <section
                role="dialog"
                aria-modal="true"
                className="relative w-full max-w-130 overflow-hidden rounded-panel bg-paper text-ink shadow-2xl"
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute right-5 top-5 z-10 flex size-10 items-center justify-center rounded-full border border-ink/10 transition-colors hover:bg-white"
                >
                    <X className="size-4" />
                </button>

                <div className="px-7 pb-8 pt-12 text-center sm:px-10 sm:pb-10">
                    <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-accent text-white">
                        <Check className="size-7" strokeWidth={2.5} />
                    </div>

                    <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/35">
                        Booking confirmed
                    </p>

                    <h2 className="mt-3 text-4xl font-medium tracking-[-0.055em] sm:text-5xl">
                        You&apos;re going!
                    </h2>

                    <p className="mx-auto mt-5 max-w-sm text-sm leading-6 text-ink/50">
                        Your booking for {event.title} has been confirmed.
                    </p>

                    <div className="my-8 border-y border-dashed border-ink/15 py-6">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/30">
                            Booking code
                        </p>

                        <p className="mt-2 font-mono text-xl font-semibold tracking-[0.08em]">
                            {bookingCode}
                        </p>
                    </div>

                    <Link
                        href={ticketHref}
                        className="group flex h-14 w-full items-center justify-center gap-3 rounded-pill bg-ink text-sm font-semibold text-white transition-colors hover:bg-canvas-soft"
                    >
                        View my ticket

                        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>

                    <button
                        type="button"
                        onClick={onClose}
                        className="mt-4 text-sm font-medium text-ink/40 transition-colors hover:text-ink"
                    >
                        Back to event
                    </button>
                </div>
            </section>
        </div>
    );
}