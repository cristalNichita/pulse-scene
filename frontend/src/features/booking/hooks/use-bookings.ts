"use client";

import { useQuery } from "@tanstack/react-query";

import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { bookingQueryKeys } from "@/features/booking/api/booking-query-keys";
import { getBookings } from "@/features/booking/api/bookings-api";

export function useBookings() {
    const {
        data: user,
        isPending: isAuthPending,
    } = useCurrentUser();

    const query = useQuery({
        queryKey: bookingQueryKeys.list(
            user?.id ?? 0,
        ),

        queryFn: getBookings,

        enabled: Boolean(user),

        staleTime: 30_000,
    });

    return {
        ...query,

        user,

        bookings: query.data ?? [],

        isLoading:
            isAuthPending ||
            (
                Boolean(user) &&
                query.isPending
            ),
    };
}