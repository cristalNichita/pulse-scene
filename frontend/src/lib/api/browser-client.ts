import { ApiError } from "@/lib/api/api-error";

const SAFE_METHODS = new Set([
    "GET",
    "HEAD",
    "OPTIONS",
]);

function getBackendUrl() {
    const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!backendUrl) {
        throw new Error(
            "NEXT_PUBLIC_BACKEND_URL is not configured.",
        );
    }

    return backendUrl.replace(/\/$/, "");
}

function getCookie(name: string) {
    if (typeof document === "undefined") {
        return null;
    }

    const prefix = `${name}=`;

    const cookie = document.cookie
        .split("; ")
        .find((item) => item.startsWith(prefix));

    return cookie
        ? decodeURIComponent(
            cookie.substring(prefix.length),
        )
        : null;
}

async function requestCsrfCookie() {
    const response = await fetch(
        `${getBackendUrl()}/sanctum/csrf-cookie`,
        {
            method: "GET",
            credentials: "include",

            headers: {
                Accept: "application/json",
            },
        },
    );

    if (!response.ok) {
        throw new ApiError(response.status);
    }
}

interface BrowserApiOptions
    extends Omit<RequestInit, "body"> {
    body?: unknown;
}

export async function browserApiRequest<T>(
    path: string,
    options: BrowserApiOptions = {},
): Promise<T> {
    const method = (
        options.method ?? "GET"
    ).toUpperCase();

    if (!SAFE_METHODS.has(method)) {
        const csrfToken = getCookie("XSRF-TOKEN");

        if (!csrfToken) {
            await requestCsrfCookie();
        }
    }

    const headers = new Headers(options.headers);

    headers.set("Accept", "application/json");

    if (options.body !== undefined) {
        headers.set(
            "Content-Type",
            "application/json",
        );
    }

    if (!SAFE_METHODS.has(method)) {
        const csrfToken = getCookie("XSRF-TOKEN");

        if (csrfToken) {
            headers.set(
                "X-XSRF-TOKEN",
                csrfToken,
            );
        }
    }

    const response = await fetch(
        `${getBackendUrl()}${path}`,
        {
            ...options,

            method,
            headers,

            credentials: "include",

            body:
                options.body !== undefined
                    ? JSON.stringify(options.body)
                    : undefined,
        },
    );

    if (!response.ok) {
        let payload: unknown;

        try {
            payload = await response.json();
        } catch {
            payload = undefined;
        }

        throw new ApiError(
            response.status,
            payload,
        );
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return response.json() as Promise<T>;
}