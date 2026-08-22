import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CategoryCard } from "@/features/events/components/category-card";
import type { CategoryPreview } from "@/features/events/types/category";

interface CategoriesSectionProps {
    categories: CategoryPreview[];
}

export function CategoriesSection({
                                      categories,
                                  }: CategoriesSectionProps) {
    return (
        <section
            id="categories"
            className="bg-canvas py-28 text-white md:py-36"
        >
            <Container>
                <SectionHeading
                    eyebrow="Find your scene"
                    title="Whatever you're into."
                    description="From packed rooms and late nights to slow Sundays and new ideas."
                    actionLabel="Browse categories"
                    actionHref="/events"
                    className="mb-12 md:mb-16"
                />

                <div className="grid gap-5 md:grid-cols-2">
                    {categories.map((category, index) => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                            index={index}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
}