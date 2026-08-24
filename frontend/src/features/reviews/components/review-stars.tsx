import { Star } from "lucide-react";

import { cn } from "@/lib/cn";

interface ReviewStarsProps {
    rating: number;
    className?: string;
}

export function ReviewStars({
                                rating,
                                className,
                            }: ReviewStarsProps) {
    return (
        <div
            className={cn(
                "flex items-center gap-1",
                className,
            )}
            aria-label={`${rating} out of 5 stars`}
        >
            {Array.from({
                length: 5,
            }).map((_, index) => {
                const active =
                    index < rating;

                return (
                    <Star
                        key={index}
                        className={cn(
                            "size-3.5",
                            active
                                ? "fill-accent text-accent"
                                : "text-ink/15",
                        )}
                    />
                );
            })}
        </div>
    );
}