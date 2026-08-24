import type { EventApiPreview } from "@/features/events/api/event-api.types";

export type BookingApiStatus =
    | "confirmed"
    | "cancelled";

export interface BookingApi {
    id: number;
    code: string;

    quantity: number;

    unit_price: number;
    total_price: number;

    currency: string;

    status: BookingApiStatus;

    booked_at: string;
    cancelled_at: string | null;

    event: EventApiPreview;
}

export interface BookingApiResponse {
    data: BookingApi;
}