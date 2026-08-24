import type { Metadata } from "next";

import { TicketPageContent } from "@/features/booking/components/ticket-page-content";

export const metadata: Metadata = {
    title: "Digital ticket",
};

interface TicketPageProps {
    params: Promise<{
        code: string;
    }>;
}

export default async function TicketPage({
                                             params,
                                         }: TicketPageProps) {
    const { code } = await params;

    return (
        <TicketPageContent
            code={code}
        />
    );
}