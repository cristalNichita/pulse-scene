import { ApiError } from "@/lib/api/api-error";

interface LaravelErrorPayload {
    message?: string;

    errors?: Record<
        string,
        string[]
    >;
}

function isLaravelErrorPayload(
    payload: unknown,
): payload is LaravelErrorPayload {
    return (
        typeof payload === "object" &&
        payload !== null
    );
}

export function getApiErrorMessage(
    error: unknown,
    fallback = "Something went wrong.",
) {
    if (
        !(error instanceof ApiError) ||
        !isLaravelErrorPayload(error.payload)
    ) {
        return fallback;
    }

    return error.payload.message ?? fallback;
}

export function getApiValidationErrors(
    error: unknown,
): Record<string, string> {
    if (
        !(error instanceof ApiError) ||
        error.status !== 422 ||
        !isLaravelErrorPayload(error.payload) ||
        !error.payload.errors
    ) {
        return {};
    }

    return Object.fromEntries(
        Object.entries(
            error.payload.errors,
        ).map(([field, messages]) => [
            field,
            messages[0] ?? "Invalid value.",
        ]),
    );
}