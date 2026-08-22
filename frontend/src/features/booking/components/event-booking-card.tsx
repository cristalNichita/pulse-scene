import {
    CalendarDays,
    Minus,
    Plus,
    Ticket,
} from "lucide-react";

import type { EventDetails } from "@/features/events/types/event-details";
import {
    formatEventLongDate,
    formatEventTime,
    formatPrice,
    formatPriceFrom,
} from "@/lib/formatters";
import { MAX_TICKET_QUANTITY } from "@/features/booking/lib/booking";

interface EventBookingCardProps {
    event: EventDetails;
    quantity: number;
    onDecrease: () => void;
    onIncrease: () => void;
    onBook: () => void;
}

export function EventBookingCard({
                                     event,
                                     quantity,
                                     onDecrease,
                                     onIncrease,
                                     onBook,
                                 }: EventBookingCardProps) {
    const total = event.priceFrom * quantity;

    return (
        <aside className="lg:sticky lg:top-8">
            <div className="overflow-hidden rounded-panel border border-ink/10 bg-white">
                <div className="border-b border-ink/10 p-6 sm:p-7">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink/35">
                        Tickets
                    </p>

                    <p className="text-3xl font-medium tracking-[-0.045em] text-ink">
                        {formatPriceFrom(event.priceFrom)}
                    </p>
                </div>

                <div className="space-y-5 p-6 sm:p-7">
                    <div className="flex gap-4">
                        <CalendarDays className="mt-0.5 size-5 shrink-0 text-ink/35" />

                        <div>
                            <p className="text-sm font-medium text-ink">
                                {formatEventLongDate(event.startsAt)}
                            </p>

                            <p className="mt-1 text-sm text-ink/45">
                                {formatEventTime(event.startsAt)}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Ticket className="mt-0.5 size-5 shrink-0 text-ink/35" />

                        <div className="flex-1">
                            <p className="text-sm font-medium text-ink">
                                General Admission
                            </p>

                            <p className="mt-1 text-sm text-ink/45">
                                {formatPrice(event.priceFrom)} per ticket
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-ink/10 p-6 sm:p-7">
                    <div className="mb-7 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-ink">
                                Quantity
                            </p>

                            <p className="mt-1 text-xs text-ink/40">
                                Max. {MAX_TICKET_QUANTITY} tickets
                            </p>
                        </div>

                        <div className="flex items-center rounded-pill border border-ink/10 bg-paper">
                            <button
                                type="button"
                                onClick={onDecrease}
                                disabled={quantity === 1}
                                aria-label="Decrease quantity"
                                className="flex size-10 items-center justify-center rounded-pill text-ink transition-colors hover:bg-white disabled:opacity-25"
                            >
                                <Minus className="size-4" />
                            </button>

                            <span className="w-10 text-center text-sm font-semibold text-ink">
                {quantity}
              </span>

                            <button
                                type="button"
                                onClick={onIncrease}
                                disabled={quantity === MAX_TICKET_QUANTITY}
                                aria-label="Increase quantity"
                                className="flex size-10 items-center justify-center rounded-pill text-ink transition-colors hover:bg-white disabled:opacity-25"
                            >
                                <Plus className="size-4" />
                            </button>
                        </div>
                    </div>

                    <div className="mb-6 flex items-end justify-between border-t border-ink/10 pt-6">
            <span className="text-sm text-ink/50">
              Total
            </span>

                        <span className="text-2xl font-semibold tracking-[-0.04em] text-ink">
              {formatPrice(total)}
            </span>
                    </div>

                    <button
                        type="button"
                        onClick={onBook}
                        className="h-14 w-full rounded-pill bg-accent text-sm font-semibold text-white transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-accent-hover"
                    >
                        Book now
                    </button>

                    <p className="mt-4 text-center text-xs leading-5 text-ink/35">
                        No payment will be charged in this demo.
                    </p>
                </div>
            </div>
        </aside>
    );
}