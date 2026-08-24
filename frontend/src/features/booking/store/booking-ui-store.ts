import { create } from "zustand";

import { MAX_TICKET_QUANTITY } from "@/features/booking/lib/booking";

export type BookingStep =
    | "idle"
    | "checkout"
    | "confirming"
    | "success";

interface BookingUiState {
    quantities: Record<
        string,
        number
    >;

    activeEventSlug: string | null;

    step: BookingStep;

    incrementQuantity: (
        eventSlug: string,
    ) => void;

    decrementQuantity: (
        eventSlug: string,
    ) => void;

    openCheckout: (
        eventSlug: string,
    ) => void;

    setStep: (
        step: BookingStep,
    ) => void;

    closeBooking: () => void;
}

export const useBookingUiStore =
    create<BookingUiState>(
        (set) => ({
            quantities: {},

            activeEventSlug: null,

            step: "idle",

            incrementQuantity: (
                eventSlug,
            ) => {
                set((state) => {
                    const current =
                        state.quantities[
                            eventSlug
                            ] ?? 1;

                    return {
                        quantities: {
                            ...state.quantities,

                            [eventSlug]: Math.min(
                                MAX_TICKET_QUANTITY,
                                current + 1,
                            ),
                        },
                    };
                });
            },

            decrementQuantity: (
                eventSlug,
            ) => {
                set((state) => {
                    const current =
                        state.quantities[
                            eventSlug
                            ] ?? 1;

                    return {
                        quantities: {
                            ...state.quantities,

                            [eventSlug]: Math.max(
                                1,
                                current - 1,
                            ),
                        },
                    };
                });
            },

            openCheckout: (
                eventSlug,
            ) => {
                set({
                    activeEventSlug:
                    eventSlug,

                    step: "checkout",
                });
            },

            setStep: (
                step,
            ) => {
                set({
                    step,
                });
            },

            closeBooking: () => {
                set({
                    activeEventSlug: null,
                    step: "idle",
                });
            },
        }),
    );