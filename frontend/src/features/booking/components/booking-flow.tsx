"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { BookingDrawer } from "@/features/booking/components/booking-drawer";
import { BookingSuccess } from "@/features/booking/components/booking-success";
import { EventBookingCard } from "@/features/booking/components/event-booking-card";
import { useCreateBooking } from "@/features/booking/hooks/use-create-booking";
import { useBookingUiStore } from "@/features/booking/store/booking-ui-store";
import type { EventDetails } from "@/features/events/types/event-details";

interface BookingFlowProps {
    event: EventDetails;
}

export function BookingFlow({
                                event,
                            }: BookingFlowProps) {
    const router = useRouter();

    const {
        data: user,
        isPending: isAuthPending,
    } = useCurrentUser();

    const createBooking =
        useCreateBooking();

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

    const showSuccess =
        useBookingUiStore(
            (state) =>
                state.showSuccess,
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

    const isOverlayOpen =
        step === "checkout" ||
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
                createBooking.isPending
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
        createBooking.isPending,
        closeBooking,
    ]);

    function handleBook() {
        if (isAuthPending) {
            return;
        }

        if (!user) {
            router.push(
                `/login?next=${encodeURIComponent(
                    `/events/${event.slug}`,
                )}`,
            );

            return;
        }

        openCheckout(event.slug);
    }

    async function confirmBooking() {
        const booking =
            await createBooking.mutateAsync({
                eventSlug: event.slug,
                quantity,
            });

        if (booking) {
            showSuccess();
        }
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
                onBook={handleBook}
            />

            <BookingDrawer
                event={event}
                quantity={quantity}
                isOpen={
                    step === "checkout"
                }
                isSubmitting={
                    createBooking.isPending
                }
                onClose={() => {
                    if (
                        !createBooking.isPending
                    ) {
                        closeBooking();
                    }
                }}
                onConfirm={
                    confirmBooking
                }
            />

            {createBooking.data ? (
                <BookingSuccess
                    event={event}
                    bookingCode={
                        createBooking.data.code
                    }
                    quantity={
                        createBooking.data.quantity
                    }
                    isOpen={
                        step === "success"
                    }
                    onClose={
                        closeBooking
                    }
                />
            ) : null}
        </>
    );
}