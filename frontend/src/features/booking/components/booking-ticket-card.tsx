"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ArrowUpRight,
    CalendarDays,
    MapPin,
    Ticket,
    X,
} from "lucide-react";

import type { Booking } from "@/features/booking/types/booking";
import {
    formatBookingDate,
    formatBookingPrice,
    formatBookingTime,
} from "@/features/booking/lib/booking-formatters";
import { useCancelBooking } from "@/features/booking/hooks/use-cancel-booking";
import { cn } from "@/lib/cn";

interface BookingTicketCardProps {
    booking: Booking;
}

export function BookingTicketCard({
                                      booking,
                                  }: BookingTicketCardProps) {
    const cancelBooking =
        useCancelBooking();

    const isCancelled =
        booking.status === "cancelled";

    async function handleCancel() {
        if (
            cancelBooking.isPending ||
            isCancelled
        ) {
            return;
        }

        await cancelBooking.mutateAsync(
            booking.code,
        );
    }

    return (
        <article
            className={cn(
                "group overflow-hidden rounded-panel border border-ink/10 bg-white",
                isCancelled &&
                "opacity-60",
            )}
        >
            <div className="grid min-h-75 md:grid-cols-[0.8fr_1.2fr]">
                <Link
                    href={`/events/${booking.event.slug}`}
                    className="relative min-h-60 overflow-hidden md:min-h-full"
                >
                    <Image
                        src={booking.event.imageUrl}
                        alt={booking.event.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 40vw"
                        className="object-cover transition duration-700 group-hover:scale-[1.03]"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/5 to-transparent" />

                    <div className="absolute left-6 top-6">
            <span className="rounded-pill bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink backdrop-blur">
              {booking.event.category.name}
            </span>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 text-white">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">
                            {booking.event.venue.city}
                        </p>

                        <h3 className="mt-2 text-3xl font-medium tracking-tighter">
                            {booking.event.title}
                        </h3>
                    </div>
                </Link>

                <div className="flex flex-col p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-6">
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/35">
                                Booking
                            </p>

                            <p className="mt-2 font-mono text-sm font-semibold tracking-[0.12em]">
                                {booking.code}
                            </p>
                        </div>

                        <span
                            className={cn(
                                "rounded-pill px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em]",
                                isCancelled
                                    ? "bg-ink/5 text-ink/40"
                                    : "bg-accent/10 text-accent",
                            )}
                        >
              {booking.status}
            </span>
                    </div>

                    <div className="my-7 h-px bg-ink/10" />

                    <div className="grid gap-5 sm:grid-cols-2">
                        <div className="flex gap-3">
                            <CalendarDays className="mt-0.5 size-4 text-accent" />

                            <div>
                                <p className="text-xs font-semibold text-ink">
                                    {formatBookingDate(
                                        booking.event.startsAt,
                                    )}
                                </p>

                                <p className="mt-1 text-xs text-ink/40">
                                    {formatBookingTime(
                                        booking.event.startsAt,
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <MapPin className="mt-0.5 size-4 text-accent" />

                            <div>
                                <p className="text-xs font-semibold text-ink">
                                    {booking.event.venue.name}
                                </p>

                                <p className="mt-1 text-xs text-ink/40">
                                    {booking.event.venue.city}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Ticket className="mt-0.5 size-4 text-accent" />

                            <div>
                                <p className="text-xs font-semibold text-ink">
                                    General Admission
                                </p>

                                <p className="mt-1 text-xs text-ink/40">
                                    {booking.quantity}{" "}
                                    {booking.quantity === 1
                                        ? "ticket"
                                        : "tickets"}
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/35">
                                Total
                            </p>

                            <p className="mt-1 text-lg font-semibold tracking-[-0.03em]">
                                {formatBookingPrice(
                                    booking.totalPrice,
                                    booking.currency,
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
                        {!isCancelled ? (
                            <Link
                                href={`/tickets/${booking.code}`}
                                className="flex items-center gap-2 rounded-pill bg-ink px-5 py-3 text-xs font-semibold text-white transition hover:bg-accent"
                            >
                                View ticket

                                <ArrowUpRight className="size-3.5" />
                            </Link>
                        ) : null}

                        {!isCancelled ? (
                            <button
                                type="button"
                                disabled={cancelBooking.isPending}
                                onClick={handleCancel}
                                className="flex items-center gap-2 rounded-pill border border-ink/10 px-5 py-3 text-xs font-semibold text-ink/50 transition hover:border-ink/25 hover:text-ink disabled:pointer-events-none disabled:opacity-40"
                            >
                                <X className="size-3.5" />

                                {cancelBooking.isPending
                                    ? "Cancelling..."
                                    : "Cancel booking"}
                            </button>
                        ) : (
                            <span className="text-xs text-ink/35">
                This booking has been cancelled.
              </span>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}