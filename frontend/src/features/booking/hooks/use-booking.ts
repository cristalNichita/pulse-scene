"use client";

import { useQuery } from "@tanstack/react-query";

import { bookingQueryKeys } from "@/features/booking/api/booking-query-keys";
import { getBooking } from "@/features/booking/api/bookings-api";

export function useBooking(
    code: string,
) {
    return useQuery({
        queryKey:
            bookingQueryKeys.detail(
                code,
            ),

        queryFn: () =>
            getBooking(code),

        retry: false,
    });
}