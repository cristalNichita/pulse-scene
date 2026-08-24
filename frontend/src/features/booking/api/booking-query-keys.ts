export const bookingQueryKeys = {
    all: ["bookings"] as const,

    lists: () =>
        [
            ...bookingQueryKeys.all,
            "list",
        ] as const,

    list: (userId: number) =>
        [
            ...bookingQueryKeys.lists(),
            userId,
        ] as const,

    details: () =>
        [
            ...bookingQueryKeys.all,
            "detail",
        ] as const,

    detail: (code: string) =>
        [
            ...bookingQueryKeys.details(),
            code,
        ] as const,
};