"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import {
    createBooking,
    type CreateBookingInput,
} from "@/features/booking/api/bookings-api";
import { bookingQueryKeys } from "@/features/booking/api/booking-query-keys";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";

export function useCreateBooking() {
    const queryClient = useQueryClient();

    const {
        data: user,
    } = useCurrentUser();

    return useMutation({
        mutationFn: (
            input: CreateBookingInput,
        ) => createBooking(input),

        onSuccess: (booking) => {
            queryClient.setQueryData(
                bookingQueryKeys.detail(
                    booking.code,
                ),
                booking,
            );

            if (user) {
                void queryClient.invalidateQueries({
                    queryKey:
                        bookingQueryKeys.list(
                            user.id,
                        ),
                });
            }
        },
    });
}