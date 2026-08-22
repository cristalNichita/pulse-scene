import { ApiError } from "@/lib/api/api-error";

function getApiUrl() {
    const apiUrl = process.env.API_URL;

    if (!apiUrl) {
        throw new Error(
            "API_URL is not configured. Add it to frontend/.env.local.",
        );
    }

    return apiUrl.replace(/\/$/, "");
}

export async function apiGet<T>(
    path: string,
): Promise<T> {
    const response = await fetch(
        `${getApiUrl()}${path}`,
        {
            method: "GET",

            headers: {
                Accept: "application/json",
            },

            cache: "no-store",
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

    return response.json() as Promise<T>;
}