"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { bookingQueryKeys } from "@/features/booking/api/booking-query-keys";
import { cancelBooking } from "@/features/booking/api/bookings-api";
import type { Booking } from "@/features/booking/types/booking";

export function useCancelBooking() {
    const queryClient = useQueryClient();

    const {
        data: user,
    } = useCurrentUser();

    return useMutation({
        mutationFn: (
            code: string,
        ) => cancelBooking(code),

        onSuccess: (booking) => {
            queryClient.setQueryData(
                bookingQueryKeys.detail(
                    booking.code,
                ),
                booking,
            );

            if (!user) {
                return;
            }

            queryClient.setQueryData<Booking[]>(
                bookingQueryKeys.list(
                    user.id,
                ),
                (current = []) =>
                    current.map((item) =>
                        item.code === booking.code
                            ? booking
                            : item,
                    ),
            );
        },
    });
}