import { SearchX } from "lucide-react";

import { EventCard } from "@/features/events/components/event-card";
import type { EventPreview } from "@/features/events/types/event";

interface EventsResultsProps {
    events: EventPreview[];
    onReset: () => void;
}

export function EventsResults({
                                  events,
                                  onReset,
                              }: EventsResultsProps) {
    if (events.length === 0) {
        return (
            <div className="flex min-h-105 flex-col items-center justify-center rounded-panel border border-dashed border-ink/15 px-6 text-center">
                <div className="flex size-14 items-center justify-center rounded-full bg-ink text-white">
                    <SearchX className="size-5" />
                </div>

                <h2 className="mt-6 text-3xl font-medium tracking-[-0.045em]">
                    Nothing here yet.
                </h2>

                <p className="mt-3 max-w-md text-sm leading-6 text-ink/45">
                    Try changing your search or removing a few filters.
                </p>

                <button
                    type="button"
                    onClick={onReset}
                    className="mt-7 rounded-pill bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                    Clear filters
                </button>
            </div>
        );
    }

    return (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => (
                <EventCard
                    key={event.id}
                    event={event}
                    variant="portrait"
                />
            ))}
        </div>
    );
}