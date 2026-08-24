export const favoriteQueryKeys = {
    all: ["favorites"] as const,

    list: (userId: number) =>
        [
            "favorites",
            userId,
        ] as const,
};