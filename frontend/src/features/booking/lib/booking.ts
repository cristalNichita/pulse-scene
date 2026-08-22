export const MAX_TICKET_QUANTITY = 8;

export function createDemoBookingCode(eventId: number) {
    return `PLS-${84720 + eventId}`;
}