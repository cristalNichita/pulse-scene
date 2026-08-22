import type { HomeApiCategory } from "@/features/events/api/home-api.types";
import type { CategoryPreview } from "@/features/events/types/category";

export function mapCategoryPreview(
    category: HomeApiCategory,
): CategoryPreview {
    return {
        id: category.id,
        name: category.name,
        slug: category.slug,

        description:
            category.description ?? "",

        eventCount: category.event_count,

        imageUrl:
            category.image_url ??
            "/images/events/digital-art.jpeg",
    };
}