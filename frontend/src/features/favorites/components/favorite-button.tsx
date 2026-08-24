"use client";

import { Heart } from "lucide-react";

import type { EventPreview } from "@/features/events/types/event";
import { useFavorites } from "@/features/favorites/hooks/use-favorites";
import { useToggleFavorite } from "@/features/favorites/hooks/use-toggle-favorite";
import { cn } from "@/lib/cn";

interface FavoriteButtonProps {
    event: EventPreview;
    className?: string;
}

export function FavoriteButton({
                                   event,
                                   className,
                               }: FavoriteButtonProps) {
    const {
        favorites,
        isLoading,
    } = useFavorites();

    const {
        toggleFavorite,
        isPending,
    } = useToggleFavorite();

    const active = favorites.some(
        (item) =>
            item.slug === event.slug,
    );

    async function handleClick(
        clickEvent: React.MouseEvent<HTMLButtonElement>,
    ) {
        clickEvent.preventDefault();
        clickEvent.stopPropagation();

        if (isPending || isLoading) {
            return;
        }

        await toggleFavorite(event);
    }

    return (
        <button
            type="button"
            aria-label={
                active
                    ? `Remove ${event.title} from favorites`
                    : `Save ${event.title} to favorites`
            }
            aria-pressed={active}
            disabled={isPending || isLoading}
            onClick={handleClick}
            className={cn(
                "flex size-11 items-center justify-center rounded-pill border backdrop-blur-md transition-all duration-300",
                active
                    ? "border-white bg-white text-accent"
                    : "border-white/20 bg-black/15 text-white hover:border-white hover:bg-white hover:text-ink",
                "disabled:pointer-events-none disabled:opacity-60",
                className,
            )}
        >
            <Heart
                className={cn(
                    "size-4.5",
                    active && "fill-current",
                )}
            />
        </button>
    );
}