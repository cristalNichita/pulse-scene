import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getEventBySlug } from "@/features/events/api/events-api";
import { EventDetailsContent } from "@/features/events/components/event-details-content";
import { EventDetailsHero } from "@/features/events/components/event-details-hero";
import { ApiError } from "@/lib/api/api-error";
import {SiteFooter} from "@/components/layout/site-footer";

interface EventPageProps {
    params: Promise<{
        slug: string;
    }>;
}

async function resolveEvent(slug: string) {
    try {
        return await getEventBySlug(slug);
    } catch (error) {
        if (
            error instanceof ApiError &&
            error.status === 404
        ) {
            notFound();
        }

        throw error;
    }
}

export async function generateMetadata({
                                           params,
                                       }: EventPageProps): Promise<Metadata> {
    const { slug } = await params;

    const event = await resolveEvent(slug);

    return {
        title: event.title,
        description: event.description,
    };
}

export default async function EventPage({
                                            params,
                                        }: EventPageProps) {
    const { slug } = await params;

    const event = await resolveEvent(slug);

    return (
        <main>
            <EventDetailsHero event={event} />

            <EventDetailsContent event={event} />

            <SiteFooter />
        </main>
    );
}