"use client";

import { useEffect, useState } from "react";

import { BookingDrawer } from "@/features/booking/components/booking-drawer";
import { BookingSuccess } from "@/features/booking/components/booking-success";
import { EventBookingCard } from "@/features/booking/components/event-booking-card";
import {
    createDemoBookingCode,
    MAX_TICKET_QUANTITY,
} from "@/features/booking/lib/booking";
import type { EventDetails } from "@/features/events/types/event-details";

type BookingStep =
    | "idle"
    | "checkout"
    | "confirming"
    | "success";

interface BookingFlowProps {
    event: EventDetails;
}

export function BookingFlow({
                                event,
                            }: BookingFlowProps) {
    const [quantity, setQuantity] = useState(1);
    const [step, setStep] = useState<BookingStep>("idle");

    const bookingCode = createDemoBookingCode(event.id);

    const isOverlayOpen =
        step === "checkout" ||
        step === "confirming" ||
        step === "success";

    useEffect(() => {
        if (!isOverlayOpen) {
            return;
        }

        const previousOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isOverlayOpen]);

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key !== "Escape") {
                return;
            }

            if (step === "checkout") {
                setStep("idle");
            }

            if (step === "success") {
                setStep("idle");
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [step]);

    function decrementQuantity() {
        setQuantity((current) =>
            Math.max(1, current - 1),
        );
    }

    function incrementQuantity() {
        setQuantity((current) =>
            Math.min(MAX_TICKET_QUANTITY, current + 1),
        );
    }

    async function confirmBooking() {
        setStep("confirming");

        await new Promise((resolve) =>
            window.setTimeout(resolve, 700),
        );

        setStep("success");
    }

    return (
        <>
            <EventBookingCard
                event={event}
                quantity={quantity}
                onDecrease={decrementQuantity}
                onIncrease={incrementQuantity}
                onBook={() => setStep("checkout")}
            />

            <BookingDrawer
                event={event}
                quantity={quantity}
                isOpen={
                    step === "checkout" ||
                    step === "confirming"
                }
                isSubmitting={step === "confirming"}
                onClose={() => {
                    if (step !== "confirming") {
                        setStep("idle");
                    }
                }}
                onConfirm={confirmBooking}
            />

            <BookingSuccess
                event={event}
                bookingCode={bookingCode}
                quantity={quantity}
                isOpen={step === "success"}
                onClose={() => setStep("idle")}
            />
        </>
    );
}