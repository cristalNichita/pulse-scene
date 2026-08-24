import type { BookingApi } from "@/features/booking/api/booking-api.types";
import type { Booking } from "@/features/booking/types/booking";
import { mapEventPreview } from "@/features/events/api/event.mapper";

export function mapBooking(
    booking: BookingApi,
): Booking {
    return {
        id: booking.id,
        code: booking.code,

        quantity: booking.quantity,

        unitPrice: booking.unit_price,
        totalPrice: booking.total_price,

        currency: booking.currency,

        status: booking.status,

        bookedAt: booking.booked_at,
        cancelledAt: booking.cancelled_at,

        event: mapEventPreview(
            booking.event,
        ),
    };
}