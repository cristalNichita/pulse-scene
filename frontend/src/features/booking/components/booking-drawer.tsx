"use client";

import {
    CalendarDays,
    MapPin,
    X,
} from "lucide-react";

import type { EventDetails } from "@/features/events/types/event-details";
import {
    formatEventLongDate,
    formatEventTime,
    formatPrice,
} from "@/lib/formatters";

interface BookingDrawerProps {
    event: EventDetails;
    quantity: number;
    isOpen: boolean;
    isSubmitting: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function BookingDrawer({
                                  event,
                                  quantity,
                                  isOpen,
                                  isSubmitting,
                                  onClose,
                                  onConfirm,
                              }: BookingDrawerProps) {
    if (!isOpen) {
        return null;
    }

    const total = event.priceFrom * quantity;

    return (
        <div className="fixed inset-0 z-100">
            <button
                type="button"
                aria-label="Close booking"
                onClick={onClose}
                className="absolute inset-0 bg-black/55 backdrop-blur-[3px]"
            />

            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="booking-title"
                className="absolute inset-y-0 right-0 flex w-full max-w-130 flex-col bg-paper text-ink shadow-2xl"
            >
                <header className="flex items-center justify-between border-b border-ink/10 px-6 py-5 sm:px-8">
                    <div>
                        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/35">
                            Pulse checkout
                        </p>

                        <h2
                            id="booking-title"
                            className="text-xl font-semibold tracking-[-0.04em]"
                        >
                            Complete your booking
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex size-11 items-center justify-center rounded-full border border-ink/10 transition-colors hover:bg-white"
                        aria-label="Close"
                    >
                        <X className="size-4" />
                    </button>
                </header>

                <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-8">
                    <div className="rounded-card bg-canvas p-6 text-white">
                        <div className="mb-8 flex items-start justify-between gap-6">
                            <div>
                                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
                                    {event.category.name}
                                </p>

                                <h3 className="max-w-[320px] text-3xl font-medium leading-[0.95] tracking-[-0.055em]">
                                    {event.title}
                                </h3>
                            </div>

                            <span className="rounded-pill bg-accent px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em]">
                {quantity} {quantity === 1 ? "ticket" : "tickets"}
              </span>
                        </div>

                        <div className="space-y-4 border-t border-white/10 pt-5 text-sm text-white/60">
                            <div className="flex gap-3">
                                <CalendarDays className="mt-0.5 size-4 shrink-0" />

                                <div>
                                    <p>{formatEventLongDate(event.startsAt)}</p>
                                    <p className="mt-0.5 text-white/35">
                                        {formatEventTime(event.startsAt)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <MapPin className="mt-0.5 size-4 shrink-0" />

                                <div>
                                    <p>{event.venue.name}</p>
                                    <p className="mt-0.5 text-white/35">
                                        {event.venue.city}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className="mt-10">
                        <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/35">
                            Order summary
                        </p>

                        <div className="space-y-5">
                            <div className="flex items-start justify-between gap-6">
                                <div>
                                    <p className="text-sm font-medium">
                                        General Admission
                                    </p>

                                    <p className="mt-1 text-sm text-ink/40">
                                        {formatPrice(event.priceFrom)} × {quantity}
                                    </p>
                                </div>

                                <span className="text-sm font-semibold">
                  {formatPrice(total)}
                </span>
                            </div>

                            <div className="flex items-center justify-between border-t border-ink/10 pt-5">
                <span className="text-sm text-ink/45">
                  Total
                </span>

                                <span className="text-3xl font-semibold tracking-[-0.055em]">
                  {formatPrice(total)}
                </span>
                            </div>
                        </div>
                    </section>

                    <div className="mt-10 rounded-card border border-ink/10 bg-white p-5">
                        <p className="text-sm font-medium">
                            Demo checkout
                        </p>

                        <p className="mt-2 text-sm leading-6 text-ink/45">
                            Pulse Scene does not process real payments in this portfolio
                            version. Confirming creates a demo booking and digital ticket.
                        </p>
                    </div>
                </div>

                <footer className="border-t border-ink/10 bg-paper px-6 py-5 sm:px-8">
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isSubmitting}
                        className="flex h-14 w-full items-center justify-center rounded-pill bg-accent text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover disabled:pointer-events-none disabled:opacity-60"
                    >
                        {isSubmitting
                            ? "Confirming..."
                            : `Confirm booking · ${formatPrice(total)}`}
                    </button>
                </footer>
            </section>
        </div>
    );
}