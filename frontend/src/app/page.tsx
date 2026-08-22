import { ExploreCta } from "@/components/layout/explore-cta";
import { SiteFooter } from "@/components/layout/site-footer";
import { getHomePageData } from "@/features/events/api/home-api";
import { CategoriesSection } from "@/features/events/components/categories-section";
import { FeaturedEventHero } from "@/features/events/components/featured-event-hero";
import { PopularEventsSection } from "@/features/events/components/popular-events-section";
import { TrendingEventsSection } from "@/features/events/components/trending-events-section";
import { WeekendEventsSection } from "@/features/events/components/weekend-events-section";

export default async function HomePage() {
    const {
        featuredEvent,
        trendingEvents,
        weekendEvents,
        popularEvents,
        categories,
    } = await getHomePageData();

    if (!featuredEvent) {
        throw new Error(
            "Pulse homepage requires a featured event.",
        );
    }

    return (
        <main>
            <FeaturedEventHero event={featuredEvent} />

            <TrendingEventsSection
                events={trendingEvents}
            />

            <CategoriesSection
                categories={categories}
            />

            <WeekendEventsSection
                events={weekendEvents}
            />

            <PopularEventsSection
                events={popularEvents}
            />

            <ExploreCta />

            <SiteFooter />
        </main>
    );
}