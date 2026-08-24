"use client";

import { useEffect } from "react";

import { BookingDrawer } from "@/features/booking/components/booking-drawer";
import { BookingSuccess } from "@/features/booking/components/booking-success";
import { EventBookingCard } from "@/features/booking/components/event-booking-card";
import { createDemoBookingCode } from "@/features/booking/lib/booking";
import { useBookingUiStore } from "@/features/booking/store/booking-ui-store";
import type { EventDetails } from "@/features/events/types/event-details";

interface BookingFlowProps {
    event: EventDetails;
}

export function BookingFlow({
                                event,
                            }: BookingFlowProps) {
    const quantity =
        useBookingUiStore(
            (state) =>
                state.quantities[
                    event.slug
                    ] ?? 1,
        );

    const activeEventSlug =
        useBookingUiStore(
            (state) =>
                state.activeEventSlug,
        );

    const storedStep =
        useBookingUiStore(
            (state) => state.step,
        );

    const incrementQuantity =
        useBookingUiStore(
            (state) =>
                state.incrementQuantity,
        );

    const decrementQuantity =
        useBookingUiStore(
            (state) =>
                state.decrementQuantity,
        );

    const openCheckout =
        useBookingUiStore(
            (state) =>
                state.openCheckout,
        );

    const setStep =
        useBookingUiStore(
            (state) =>
                state.setStep,
        );

    const closeBooking =
        useBookingUiStore(
            (state) =>
                state.closeBooking,
        );

    const step =
        activeEventSlug === event.slug
            ? storedStep
            : "idle";

    const bookingCode =
        createDemoBookingCode(
            event.id,
        );

    const isOverlayOpen =
        step === "checkout" ||
        step === "confirming" ||
        step === "success";

    useEffect(() => {
        if (!isOverlayOpen) {
            return;
        }

        const previousOverflow =
            document.body.style.overflow;

        document.body.style.overflow =
            "hidden";

        return () => {
            document.body.style.overflow =
                previousOverflow;
        };
    }, [isOverlayOpen]);

    useEffect(() => {
        function handleKeyDown(
            keyboardEvent: KeyboardEvent,
        ) {
            if (
                keyboardEvent.key !==
                "Escape"
            ) {
                return;
            }

            if (
                step === "checkout" ||
                step === "success"
            ) {
                closeBooking();
            }
        }

        window.addEventListener(
            "keydown",
            handleKeyDown,
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown,
            );
        };
    }, [
        step,
        closeBooking,
    ]);

    async function confirmBooking() {
        setStep("confirming");

        await new Promise((resolve) =>
            window.setTimeout(
                resolve,
                700,
            ),
        );

        setStep("success");
    }

    return (
        <>
            <EventBookingCard
                event={event}
                quantity={quantity}
                onDecrease={() =>
                    decrementQuantity(
                        event.slug,
                    )
                }
                onIncrease={() =>
                    incrementQuantity(
                        event.slug,
                    )
                }
                onBook={() =>
                    openCheckout(
                        event.slug,
                    )
                }
            />

            <BookingDrawer
                event={event}
                quantity={quantity}
                isOpen={
                    step === "checkout" ||
                    step === "confirming"
                }
                isSubmitting={
                    step === "confirming"
                }
                onClose={() => {
                    if (
                        step !== "confirming"
                    ) {
                        closeBooking();
                    }
                }}
                onConfirm={
                    confirmBooking
                }
            />

            <BookingSuccess
                event={event}
                bookingCode={bookingCode}
                quantity={quantity}
                isOpen={
                    step === "success"
                }
                onClose={
                    closeBooking
                }
            />
        </>
    );
}