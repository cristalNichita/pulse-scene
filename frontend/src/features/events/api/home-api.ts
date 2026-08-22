import { mapCategoryPreview } from "@/features/events/api/category.mapper";
import type { HomeApiData } from "@/features/events/api/home-api.types";
import { mapEventPreview } from "@/features/events/api/event.mapper";
import type { CategoryPreview } from "@/features/events/types/category";
import type { EventPreview } from "@/features/events/types/event";
import { apiGet } from "@/lib/api/client";
import type { ApiDataResponse } from "@/lib/api/types";

export interface HomePageData {
    featuredEvent: EventPreview | null;

    trendingEvents: EventPreview[];
    weekendEvents: EventPreview[];
    popularEvents: EventPreview[];

    categories: CategoryPreview[];
}

export async function getHomePageData(): Promise<HomePageData> {
    const response = await apiGet<
        ApiDataResponse<HomeApiData>
    >("/home");

    const data = response.data;

    return {
        featuredEvent: data.featured_event
            ? mapEventPreview(data.featured_event)
            : null,

        trendingEvents: data.trending_events.map(
            mapEventPreview,
        ),

        weekendEvents: data.weekend_events.map(
            mapEventPreview,
        ),

        popularEvents: data.popular_events.map(
            mapEventPreview,
        ),

        categories: data.categories.map(
            mapCategoryPreview,
        ),
    };
}