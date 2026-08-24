"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

import type { EventPreview } from "@/features/events/types/event";
import { useFavorites } from "@/features/favorites/context/favorites-context";
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
        isFavorite,
        toggleFavorite,
        isLoading,
    } = useFavorites();

    const [isPending, setIsPending] =
        useState(false);

    const active = isFavorite(event.slug);

    async function handleClick(
        clickEvent: React.MouseEvent<HTMLButtonElement>,
    ) {
        clickEvent.preventDefault();
        clickEvent.stopPropagation();

        if (isPending || isLoading) {
            return;
        }

        setIsPending(true);

        try {
            await toggleFavorite(event);
        } finally {
            setIsPending(false);
        }
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