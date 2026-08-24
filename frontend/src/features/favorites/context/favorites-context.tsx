"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/features/auth/context/auth-context";
import type { EventPreview } from "@/features/events/types/event";
import {
    addFavorite,
    getFavorites,
    removeFavorite,
} from "@/features/favorites/api/favorites-api";

interface FavoritesContextValue {
    favorites: EventPreview[];
    isLoading: boolean;

    isFavorite: (slug: string) => boolean;

    toggleFavorite: (
        event: EventPreview,
    ) => Promise<void>;

    refreshFavorites: () => Promise<void>;
}

const FavoritesContext =
    createContext<FavoritesContextValue | null>(
        null,
    );

interface FavoritesProviderProps {
    children: React.ReactNode;
}

export function FavoritesProvider({
                                      children,
                                  }: FavoritesProviderProps) {
    const router = useRouter();

    const {
        user,
        status,
    } = useAuth();

    const [
        storedFavorites,
        setStoredFavorites,
    ] = useState<EventPreview[]>([]);

    const [
        loadedForUserId,
        setLoadedForUserId,
    ] = useState<number | null>(null);

    const [isRefreshing, setIsRefreshing] =
        useState(false);

    const favorites = useMemo(() => {
        if (
            status !== "authenticated" ||
            !user ||
            loadedForUserId !== user.id
        ) {
            return [];
        }

        return storedFavorites;
    }, [
        status,
        user,
        loadedForUserId,
        storedFavorites,
    ]);

    const refreshFavorites = useCallback(
        async () => {
            if (
                status !== "authenticated" ||
                !user
            ) {
                return;
            }

            setIsRefreshing(true);

            try {
                const events = await getFavorites();

                setStoredFavorites(events);
                setLoadedForUserId(user.id);
            } finally {
                setIsRefreshing(false);
            }
        },
        [
            status,
            user,
        ],
    );

    useEffect(() => {
        if (
            status !== "authenticated" ||
            !user
        ) {
            return;
        }

        let isActive = true;

        getFavorites()
            .then((events) => {
                if (!isActive) {
                    return;
                }

                setStoredFavorites(events);
                setLoadedForUserId(user.id);
            })
            .catch(() => {
                if (!isActive) {
                    return;
                }

                setStoredFavorites([]);
                setLoadedForUserId(user.id);
            });

        return () => {
            isActive = false;
        };
    }, [
        status,
        user,
    ]);

    const favoriteSlugs = useMemo(
        () =>
            new Set(
                favorites.map(
                    (event) => event.slug,
                ),
            ),
        [favorites],
    );

    const isFavorite = useCallback(
        (slug: string) =>
            favoriteSlugs.has(slug),
        [favoriteSlugs],
    );

    const isLoading =
        status === "loading" ||
        (
            status === "authenticated" &&
            user !== null &&
            loadedForUserId !== user.id
        ) ||
        isRefreshing;

    const toggleFavorite = useCallback(
        async (event: EventPreview) => {
            if (status !== "authenticated") {
                router.push(
                    `/login?next=${encodeURIComponent(
                        window.location.pathname,
                    )}`,
                );

                return;
            }

            if (!user || isLoading) {
                return;
            }

            const currentlyFavorite =
                favoriteSlugs.has(event.slug);

            setLoadedForUserId(user.id);

            if (currentlyFavorite) {
                setStoredFavorites((current) =>
                    current.filter(
                        (item) =>
                            item.slug !== event.slug,
                    ),
                );

                try {
                    await removeFavorite(
                        event.slug,
                    );
                } catch (error) {
                    await refreshFavorites();

                    throw error;
                }

                return;
            }

            setStoredFavorites((current) => [
                event,
                ...current,
            ]);

            try {
                await addFavorite(event.slug);
            } catch (error) {
                await refreshFavorites();

                throw error;
            }
        },
        [
            status,
            user,
            isLoading,
            favoriteSlugs,
            refreshFavorites,
            router,
        ],
    );

    const value = useMemo(
        () => ({
            favorites,
            isLoading,
            isFavorite,
            toggleFavorite,
            refreshFavorites,
        }),
        [
            favorites,
            isLoading,
            isFavorite,
            toggleFavorite,
            refreshFavorites,
        ],
    );

    return (
        <FavoritesContext.Provider
            value={value}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(
        FavoritesContext,
    );

    if (!context) {
        throw new Error(
            "useFavorites must be used inside FavoritesProvider.",
        );
    }

    return context;
}