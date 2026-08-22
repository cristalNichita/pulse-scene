"use client";

import { QRCodeSVG } from "qrcode.react";
import {
    CalendarDays,
    MapPin,
    Ticket,
} from "lucide-react";

import type { EventDetails } from "@/features/events/types/event-details";
import {
    formatEventLongDate,
    formatEventTime,
} from "@/lib/formatters";

interface DigitalTicketProps {
    event: EventDetails;
    bookingCode: string;
    quantity: number;
}

export function DigitalTicket({
                                  event,
                                  bookingCode,
                                  quantity,
                              }: DigitalTicketProps) {
    const qrValue = JSON.stringify({
        booking: bookingCode,
        event: event.slug,
    });

    return (
        <article className="relative mx-auto w-full max-w-155 overflow-hidden rounded-[34px] bg-paper text-ink shadow-floating">
            <div className="bg-accent px-7 pb-8 pt-7 text-white sm:px-10 sm:pb-10 sm:pt-9">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold tracking-[-0.06em]">
                        PULSE.
                    </p>

                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/65">
                        Digital ticket
                    </p>
                </div>

                <h1 className="mt-16 max-w-117.5 text-5xl font-semibold uppercase leading-[0.82] tracking-[-0.07em] sm:text-7xl">
                    {event.title}
                </h1>

                <p className="mt-7 font-editorial text-2xl italic text-white/80">
                    {event.subtitle}
                </p>
            </div>

            <div className="relative border-b border-dashed border-ink/20">
                <span className="absolute -left-4 top-1/2 size-8 -translate-y-1/2 rounded-full bg-canvas" />
                <span className="absolute -right-4 top-1/2 size-8 -translate-y-1/2 rounded-full bg-canvas" />
            </div>

            <div className="grid gap-8 p-7 sm:grid-cols-[1fr_auto] sm:p-10">
                <div className="space-y-7">
                    <div className="flex gap-4">
                        <CalendarDays className="mt-0.5 size-5 shrink-0 text-accent" />

                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-ink/35">
                                Date & time
                            </p>

                            <p className="mt-2 text-sm font-semibold">
                                {formatEventLongDate(event.startsAt)}
                            </p>

                            <p className="mt-1 text-sm text-ink/45">
                                {formatEventTime(event.startsAt)}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <MapPin className="mt-0.5 size-5 shrink-0 text-accent" />

                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-ink/35">
                                Venue
                            </p>

                            <p className="mt-2 text-sm font-semibold">
                                {event.venue.name}
                            </p>

                            <p className="mt-1 text-sm text-ink/45">
                                {event.venue.city}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Ticket className="mt-0.5 size-5 shrink-0 text-accent" />

                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-ink/35">
                                Admission
                            </p>

                            <p className="mt-2 text-sm font-semibold">
                                General Admission
                            </p>

                            <p className="mt-1 text-sm text-ink/45">
                                {quantity} {quantity === 1 ? "ticket" : "tickets"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-start sm:items-end">
                    <div className="rounded-[22px] bg-white p-4">
                        <QRCodeSVG
                            value={qrValue}
                            size={150}
                            level="M"
                            marginSize={0}
                        />
                    </div>

                    <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-ink/30">
                        Booking code
                    </p>

                    <p className="mt-1 font-mono text-sm font-semibold tracking-[0.08em]">
                        {bookingCode}
                    </p>
                </div>
            </div>
        </article>
    );
}