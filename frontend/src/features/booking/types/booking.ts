import type { EventPreview } from "@/features/events/types/event";

export type BookingStatus =
    | "confirmed"
    | "cancelled";

export interface Booking {
    id: number;
    code: string;

    quantity: number;

    unitPrice: number;
    totalPrice: number;

    currency: string;

    status: BookingStatus;

    bookedAt: string;
    cancelledAt: string | null;

    event: EventPreview;
}