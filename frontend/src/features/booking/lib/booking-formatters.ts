export function formatBookingDate(
    value: string,
) {
    return new Intl.DateTimeFormat(
        "en",
        {
            month: "short",
            day: "numeric",
            year: "numeric",
        },
    ).format(new Date(value));
}

export function formatBookingTime(
    value: string,
) {
    return new Intl.DateTimeFormat(
        "en",
        {
            hour: "2-digit",
            minute: "2-digit",
        },
    ).format(new Date(value));
}

export function formatBookingPrice(
    value: number,
    currency: string,
) {
    if (value === 0) {
        return "Free";
    }

    return new Intl.NumberFormat(
        "en",
        {
            style: "currency",
            currency,
            maximumFractionDigits: 0,
        },
    ).format(value);
}