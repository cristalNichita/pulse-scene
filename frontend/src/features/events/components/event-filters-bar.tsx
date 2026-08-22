import {
    CalendarDays,
    MapPin,
    Search,
    Tag,
    Ticket,
    X,
} from "lucide-react";

import type {
    EventDateFilter,
    EventFilters,
    EventPriceFilter,
} from "@/features/events/types/event-filters";

interface FilterOption {
    label: string;
    value: string;
}

interface EventFiltersBarProps {
    filters: EventFilters;

    categories: FilterOption[];
    locations: FilterOption[];

    onChange: <Key extends keyof EventFilters>(
        key: Key,
        value: EventFilters[Key],
    ) => void;

    onReset: () => void;
}

const labelClassName =
    "text-[10px] font-semibold uppercase tracking-[0.17em] text-ink/35";

const fieldClassName =
    "flex min-h-16 items-center gap-3 px-4";

export function EventFiltersBar({
                                    filters,
                                    categories,
                                    locations,
                                    onChange,
                                    onReset,
                                }: EventFiltersBarProps) {
    const hasFilters =
        filters.search !== "" ||
        filters.category !== "all" ||
        filters.location !== "all" ||
        filters.date !== "anytime" ||
        filters.price !== "any";

    return (
        <div className="rounded-panel border border-black/5 bg-paper p-2 text-ink shadow-floating">
            <div className="grid lg:grid-cols-[1.5fr_0.9fr_0.9fr_0.9fr_0.8fr_auto]">
                <label className={fieldClassName}>
                    <Search className="size-4.5 shrink-0 text-ink/35" />

                    <span className="flex min-w-0 flex-1 flex-col gap-1">
            <span className={labelClassName}>
              Search
            </span>

            <input
                type="search"
                value={filters.search}
                onChange={(event) =>
                    onChange("search", event.target.value)
                }
                placeholder="Music, art, food..."
                className="min-w-0 bg-transparent text-sm font-medium outline-none placeholder:text-ink/35"
            />
          </span>
                </label>

                <label className={`${fieldClassName} lg:border-l lg:border-ink/10`}>
                    <Tag className="size-4.5 shrink-0 text-ink/35" />

                    <span className="flex min-w-0 flex-1 flex-col gap-1">
            <span className={labelClassName}>
              Category
            </span>

            <select
                value={filters.category}
                onChange={(event) =>
                    onChange("category", event.target.value)
                }
                className="w-full appearance-none bg-transparent text-sm font-medium outline-none"
            >
              <option value="all">
                All categories
              </option>

                {categories.map((category) => (
                    <option
                        key={category.value}
                        value={category.value}
                    >
                        {category.label}
                    </option>
                ))}
            </select>
          </span>
                </label>

                <label className={`${fieldClassName} lg:border-l lg:border-ink/10`}>
                    <MapPin className="size-4.5 shrink-0 text-ink/35" />

                    <span className="flex min-w-0 flex-1 flex-col gap-1">
            <span className={labelClassName}>
              Location
            </span>

            <select
                value={filters.location}
                onChange={(event) =>
                    onChange("location", event.target.value)
                }
                className="w-full appearance-none bg-transparent text-sm font-medium outline-none"
            >
              <option value="all">
                Anywhere
              </option>

                {locations.map((location) => (
                    <option
                        key={location.value}
                        value={location.value}
                    >
                        {location.label}
                    </option>
                ))}
            </select>
          </span>
                </label>

                <label className={`${fieldClassName} lg:border-l lg:border-ink/10`}>
                    <CalendarDays className="size-4.5 shrink-0 text-ink/35" />

                    <span className="flex min-w-0 flex-1 flex-col gap-1">
            <span className={labelClassName}>
              When
            </span>

            <select
                value={filters.date}
                onChange={(event) =>
                    onChange(
                        "date",
                        event.target.value as EventDateFilter,
                    )
                }
                className="w-full appearance-none bg-transparent text-sm font-medium outline-none"
            >
              <option value="anytime">
                Any date
              </option>

              <option value="today">
                Today
              </option>

              <option value="this-weekend">
                This weekend
              </option>
            </select>
          </span>
                </label>

                <label className={`${fieldClassName} lg:border-l lg:border-ink/10`}>
                    <Ticket className="size-4.5 shrink-0 text-ink/35" />

                    <span className="flex min-w-0 flex-1 flex-col gap-1">
            <span className={labelClassName}>
              Price
            </span>

            <select
                value={filters.price}
                onChange={(event) =>
                    onChange(
                        "price",
                        event.target.value as EventPriceFilter,
                    )
                }
                className="w-full appearance-none bg-transparent text-sm font-medium outline-none"
            >
              <option value="any">
                Any price
              </option>

              <option value="free">
                Free
              </option>

              <option value="paid">
                Paid
              </option>
            </select>
          </span>
                </label>

                <div className="flex items-center justify-end p-2 lg:border-l lg:border-ink/10">
                    <button
                        type="button"
                        onClick={onReset}
                        disabled={!hasFilters}
                        className="flex size-12 items-center justify-center rounded-full border border-ink/10 text-ink/40 transition-all hover:border-ink hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-25"
                        aria-label="Reset filters"
                    >
                        <X className="size-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}