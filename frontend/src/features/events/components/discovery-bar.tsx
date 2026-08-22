import {
    ArrowUpRight,
    CalendarDays,
    MapPin,
    Search,
} from "lucide-react";

const fieldClassName =
    "flex min-h-20 items-center gap-4 rounded-[20px] px-5 transition-colors duration-200 hover:bg-black/[0.035]";

const labelClassName =
    "text-[11px] font-semibold uppercase tracking-[0.16em] text-black/40";

export function DiscoveryBar() {
    return (
        <div className="absolute inset-x-5 bottom-5 z-30 mx-auto max-w-6xl md:bottom-0 md:translate-y-1/2">
            <form className="grid overflow-hidden rounded-panel border border-black/5 bg-paper p-2 text-ink shadow-floating md:grid-cols-[1.5fr_1fr_1fr_auto]">
                <label className={fieldClassName}>
                    <Search className="size-5 shrink-0 text-black/40" />

                    <span className="flex min-w-0 flex-1 flex-col gap-1">
            <span className={labelClassName}>
              What
            </span>

            <input
                type="search"
                placeholder="Search events"
                className="min-w-0 bg-transparent text-[15px] font-medium outline-none placeholder:text-black/65"
            />
          </span>
                </label>

                <label
                    className={`${fieldClassName} border-black/8 md:border-l`}
                >
                    <MapPin className="size-5 shrink-0 text-black/40" />

                    <span className="flex min-w-0 flex-1 flex-col gap-1">
            <span className={labelClassName}>
              Where
            </span>

            <input
                defaultValue="Chișinău"
                className="min-w-0 bg-transparent text-[15px] font-medium outline-none"
            />
          </span>
                </label>

                <label
                    className={`${fieldClassName} border-black/8 md:border-l`}
                >
                    <CalendarDays className="size-5 shrink-0 text-black/40" />

                    <span className="flex min-w-0 flex-1 flex-col gap-1">
            <span className={labelClassName}>
              When
            </span>

            <select
                defaultValue="weekend"
                className="w-full appearance-none bg-transparent text-[15px] font-medium outline-none"
            >
              <option value="anytime">
                Anytime
              </option>

              <option value="today">
                Today
              </option>

              <option value="tomorrow">
                Tomorrow
              </option>

              <option value="weekend">
                This weekend
              </option>
            </select>
          </span>
                </label>

                <button
                    type="submit"
                    className="group flex min-h-16 items-center justify-center gap-3 rounded-[20px] bg-accent px-8 text-sm font-semibold text-white transition-colors duration-300 ease-smooth hover:bg-accent-hover md:min-h-20"
                >
                    Explore

                    <ArrowUpRight
                        className="size-4.5 transition-transform duration-300 ease-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                </button>
            </form>
        </div>
    );
}