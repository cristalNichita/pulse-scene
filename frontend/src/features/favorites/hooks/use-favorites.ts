"use client";

import { useQuery } from "@tanstack/react-query";

import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { getFavorites } from "@/features/favorites/api/favorites-api";
import { favoriteQueryKeys } from "@/features/favorites/api/favorite-query-keys";

export function useFavorites() {
    const {
        data: user,
        isPending: isAuthPending,
    } = useCurrentUser();

    const query = useQuery({
        queryKey: favoriteQueryKeys.list(
            user?.id ?? 0,
        ),

        queryFn: getFavorites,

        enabled: Boolean(user),

        staleTime: 30_000,
    });

    return {
        ...query,

        user,

        favorites: query.data ?? [],

        isLoading:
            isAuthPending ||
            (
                Boolean(user) &&
                query.isPending
            ),
    };
}