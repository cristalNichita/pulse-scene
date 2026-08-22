import { ExploreCta } from "@/components/layout/explore-cta";
import { SiteFooter } from "@/components/layout/site-footer";
import { CategoriesSection } from "@/features/events/components/categories-section";
import { FeaturedEventHero } from "@/features/events/components/featured-event-hero";
import { PopularEventsSection } from "@/features/events/components/popular-events-section";
import { TrendingEventsSection } from "@/features/events/components/trending-events-section";
import { WeekendEventsSection } from "@/features/events/components/weekend-events-section";
import { categories } from "@/features/events/data/demo-categories";
import {
    featuredEvent,
    popularEvents,
    trendingEvents,
    weekendEvents,
} from "@/features/events/data/demo-events";

export default function HomePage() {
    return (
        <main>
            <FeaturedEventHero event={featuredEvent} />

            <TrendingEventsSection events={trendingEvents} />

            <CategoriesSection categories={categories} />

            <WeekendEventsSection events={weekendEvents} />

            <PopularEventsSection events={popularEvents} />

            <ExploreCta />

            <SiteFooter />
        </main>
    );
}