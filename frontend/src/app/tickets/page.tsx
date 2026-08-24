import type { Metadata } from "next";

import { MyTicketsPageContent } from "@/features/booking/components/my-tickets-page-content";

export const metadata: Metadata = {
    title: "My tickets",
    description:
        "Your bookings and digital tickets on Pulse.",
};

export default function TicketsPage() {
    return <MyTicketsPageContent />;
}