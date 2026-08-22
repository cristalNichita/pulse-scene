export type EventDateFilter =
    | "anytime"
    | "today"
    | "this-weekend";

export type EventPriceFilter =
    | "any"
    | "free"
    | "paid";

export interface EventFilters {
    search: string;
    category: string;
    location: string;
    date: EventDateFilter;
    price: EventPriceFilter;
}