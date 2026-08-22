import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { CategoryPreview } from "@/features/events/types/category";

interface CategoryCardProps {
    category: CategoryPreview;
    index: number;
}

export function CategoryCard({
                                 category,
                                 index,
                             }: CategoryCardProps) {
    return (
        <Link
            href={`/events?category=${category.slug}`}
            className="group relative isolate min-h-75 overflow-hidden rounded-card border border-white/10 bg-canvas-soft sm:min-h-90"
        >
            <Image
                src={category.imageUrl}
                alt={category.name}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover opacity-65 grayscale-15 transition-all duration-700 ease-smooth group-hover:scale-[1.04] group-hover:opacity-85 group-hover:grayscale-0"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/30 to-black/10" />

            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6 sm:p-7">
        <span className="text-xs font-medium tracking-[0.18em] text-white/45">
          0{index + 1}
        </span>

                <span className="flex size-11 items-center justify-center rounded-pill border border-white/15 bg-black/10 backdrop-blur-md transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-ink">
          <ArrowUpRight className="size-4" />
        </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                    {category.eventCount} events
                </p>

                <h3 className="text-4xl font-medium tracking-[-0.055em] sm:text-5xl">
                    {category.name}
                </h3>

                <p className="mt-4 max-w-sm text-sm leading-6 text-white/55">
                    {category.description}
                </p>
            </div>
        </Link>
    );
}