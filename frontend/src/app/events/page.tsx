import { SiteFooter } from "@/components/layout/site-footer";
import { EventsExplorer } from "@/features/events/components/events-explorer";
import { allDemoEvents } from "@/features/events/data/demo-events";
import type {
    EventDateFilter,
    EventFilters,
    EventPriceFilter,
} from "@/features/events/types/event-filters";

interface EventsPageProps {
    searchParams: Promise<{
        search?: string | string[];
        category?: string | string[];
        location?: string | string[];
        date?: string | string[];
        price?: string | string[];
    }>;
}

function getStringParam(
    value: string | string[] | undefined,
) {
    return typeof value === "string"
        ? value
        : "";
}

export default async function EventsPage({
                                             searchParams,
                                         }: EventsPageProps) {
    const params = await searchParams;

    const date = getStringParam(params.date);
    const price = getStringParam(params.price);

    const initialFilters: EventFilters = {
        search: getStringParam(params.search),

        category:
            getStringParam(params.category) || "all",

        location:
            getStringParam(params.location) || "all",

        date:
            date === "today" ||
            date === "this-weekend"
                ? (date as EventDateFilter)
                : "anytime",

        price:
            price === "free" ||
            price === "paid"
                ? (price as EventPriceFilter)
                : "any",
    };

    return (
        <>
            <EventsExplorer
                events={allDemoEvents}
                initialFilters={initialFilters}
            />

            <SiteFooter />
        </>
    );
}