"use client";

import {
    useCallback,
} from "react";
import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import type { EventPreview } from "@/features/events/types/event";
import {
    addFavorite,
    removeFavorite,
} from "@/features/favorites/api/favorites-api";
import { favoriteQueryKeys } from "@/features/favorites/api/favorite-query-keys";

interface ToggleFavoriteVariables {
    event: EventPreview;
    remove: boolean;
    userId: number;
}

interface ToggleFavoriteContext {
    previous: EventPreview[];
    userId: number;
}

export function useToggleFavorite() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const {
        data: user,
    } = useCurrentUser();

    const mutation = useMutation<
        void,
        Error,
        ToggleFavoriteVariables,
        ToggleFavoriteContext
    >({
        mutationFn: async ({
                               event,
                               remove,
                           }) => {
            if (remove) {
                await removeFavorite(
                    event.slug,
                );

                return;
            }

            await addFavorite(
                event.slug,
            );
        },

        onMutate: async ({
                             event,
                             remove,
                             userId,
                         }) => {
            const queryKey =
                favoriteQueryKeys.list(
                    userId,
                );

            await queryClient.cancelQueries({
                queryKey,
            });

            const previous =
                queryClient.getQueryData<
                    EventPreview[]
                >(queryKey) ?? [];

            queryClient.setQueryData<
                EventPreview[]
            >(
                queryKey,

                remove
                    ? previous.filter(
                        (item) =>
                            item.slug !==
                            event.slug,
                    )
                    : [
                        event,
                        ...previous,
                    ],
            );

            return {
                previous,
                userId,
            };
        },

        onError: (
            _error,
            _variables,
            context,
        ) => {
            if (!context) {
                return;
            }

            queryClient.setQueryData(
                favoriteQueryKeys.list(
                    context.userId,
                ),
                context.previous,
            );
        },

        onSettled: (
            _data,
            _error,
            variables,
        ) => {
            void queryClient.invalidateQueries({
                queryKey:
                    favoriteQueryKeys.list(
                        variables.userId,
                    ),
            });
        },
    });

    const toggleFavorite = useCallback(
        async (
            event: EventPreview,
        ) => {
            if (!user) {
                router.push(
                    `/login?next=${encodeURIComponent(
                        window.location.pathname,
                    )}`,
                );

                return;
            }

            const queryKey =
                favoriteQueryKeys.list(
                    user.id,
                );

            const favorites =
                queryClient.getQueryData<
                    EventPreview[]
                >(queryKey) ?? [];

            const remove = favorites.some(
                (item) =>
                    item.slug === event.slug,
            );

            await mutation.mutateAsync({
                event,
                remove,
                userId: user.id,
            });
        },
        [
            user,
            router,
            queryClient,
            mutation,
        ],
    );

    return {
        toggleFavorite,
        isPending: mutation.isPending,
    };
}