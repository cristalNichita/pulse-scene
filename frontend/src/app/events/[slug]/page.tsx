import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EventDetailsContent } from "@/features/events/components/event-details-content";
import { EventDetailsHero } from "@/features/events/components/event-details-hero";
import { getDemoEventBySlug } from "@/features/events/data/demo-event-details";
import { allDemoEvents } from "@/features/events/data/demo-events";
import {SiteFooter} from "@/components/layout/site-footer";

interface EventPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export function generateStaticParams() {
    return allDemoEvents.map((event) => ({
        slug: event.slug,
    }));
}

export async function generateMetadata({
                                           params,
                                       }: EventPageProps): Promise<Metadata> {
    const { slug } = await params;

    const event = getDemoEventBySlug(slug);

    if (!event) {
        return {
            title: "Event not found",
        };
    }

    return {
        title: event.title,
        description: event.description,
    };
}

export default async function EventPage({
                                            params,
                                        }: EventPageProps) {
    const { slug } = await params;

    const event = getDemoEventBySlug(slug);

    if (!event) {
        notFound();
    }

    return (
        <main>
            <EventDetailsHero event={event} />

            <EventDetailsContent event={event} />

            <SiteFooter />
        </main>
    );
}