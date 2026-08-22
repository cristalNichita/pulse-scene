export function formatEventDay(date: string) {
    return new Intl.DateTimeFormat("en", {
        day: "2-digit",
    }).format(new Date(date));
}

export function formatEventMonth(date: string) {
    return new Intl.DateTimeFormat("en", {
        month: "long",
    })
        .format(new Date(date))
        .toUpperCase();
}

export function formatEventCardDate(date: string) {
    return new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
    }).format(new Date(date));
}

export function formatPriceFrom(price: number) {
    if (price === 0) {
        return "Free";
    }

    return `From $${price}`;
}