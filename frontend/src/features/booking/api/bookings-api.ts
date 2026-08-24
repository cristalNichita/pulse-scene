import type {
    BookingApi,
    BookingApiResponse,
} from "@/features/booking/api/booking-api.types";
import { mapBooking } from "@/features/booking/api/booking.mapper";
import type { Booking } from "@/features/booking/types/booking";
import { browserApiRequest } from "@/lib/api/browser-client";
import type { PaginatedApiResponse } from "@/lib/api/types";

export interface CreateBookingInput {
    eventSlug: string;
    quantity: number;
}

export async function createBooking(
    input: CreateBookingInput,
): Promise<Booking> {
    const response =
        await browserApiRequest<BookingApiResponse>(
            "/api/v1/bookings",
            {
                method: "POST",

                body: {
                    event_slug: input.eventSlug,
                    quantity: input.quantity,
                },
            },
        );

    return mapBooking(response.data);
}

export async function getBookings(): Promise<
    Booking[]
> {
    const response =
        await browserApiRequest<
            PaginatedApiResponse<BookingApi>
        >("/api/v1/me/bookings");

    return response.data.map(
        mapBooking,
    );
}

export async function getBooking(
    code: string,
): Promise<Booking> {
    const response =
        await browserApiRequest<BookingApiResponse>(
            `/api/v1/bookings/${encodeURIComponent(code)}`,
        );

    return mapBooking(response.data);
}

export async function cancelBooking(
    code: string,
): Promise<Booking> {
    const response =
        await browserApiRequest<BookingApiResponse>(
            `/api/v1/bookings/${encodeURIComponent(code)}`,
            {
                method: "DELETE",
            },
        );

    return mapBooking(response.data);
}