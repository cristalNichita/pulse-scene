const EVENT_TIME_ZONE = "Europe/Chisinau";

export function formatEventDay(date: string) {
    return new Intl.DateTimeFormat("en", {
        day: "2-digit",
        timeZone: EVENT_TIME_ZONE,
    }).format(new Date(date));
}

export function formatEventMonth(date: string) {
    return new Intl.DateTimeFormat("en", {
        month: "long",
        timeZone: EVENT_TIME_ZONE,
    })
        .format(new Date(date))
        .toUpperCase();
}

export function formatEventCardDate(date: string) {
    return new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        timeZone: EVENT_TIME_ZONE,
    }).format(new Date(date));
}

export function formatEventLongDate(date: string) {
    return new Intl.DateTimeFormat("en", {
        weekday: "long",
        month: "long",
        day: "numeric",
        timeZone: EVENT_TIME_ZONE,
    }).format(new Date(date));
}

export function formatEventTime(date: string) {
    return new Intl.DateTimeFormat("en", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: EVENT_TIME_ZONE,
    }).format(new Date(date));
}

export function formatPriceFrom(price: number) {
    if (price === 0) {
        return "Free";
    }

    return `From $${price}`;
}

export function formatPrice(price: number) {
    if (price === 0) {
        return "Free";
    }

    return `$${price}`;
}