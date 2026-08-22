import type { CategoryPreview } from "@/features/events/types/category";

export const categories: CategoryPreview[] = [
    {
        id: 1,
        name: "Music",
        slug: "music",
        description: "Live shows, festivals and nights worth staying out for.",
        eventCount: 24,
        imageUrl: "/images/events/midnight-jazz.jpg",
    },
    {
        id: 2,
        name: "Technology",
        slug: "technology",
        description: "Ideas, products and people shaping what comes next.",
        eventCount: 12,
        imageUrl: "/images/events/tech-future.jpg",
    },
    {
        id: 3,
        name: "Food",
        slug: "food",
        description: "Pop-ups, tastings and weekends built around good food.",
        eventCount: 18,
        imageUrl: "/images/events/urban-food.jpeg",
    },
    {
        id: 4,
        name: "Art",
        slug: "art",
        description: "Exhibitions, installations and new ways to see the city.",
        eventCount: 15,
        imageUrl: "/images/events/digital-art.jpeg",
    },
];