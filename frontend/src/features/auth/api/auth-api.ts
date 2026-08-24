import type { AuthUserResponse } from "@/features/auth/api/auth-api.types";
import { mapAuthUser } from "@/features/auth/api/auth.mapper";
import type { AuthUser } from "@/features/auth/types/auth-user";
import { browserApiRequest } from "@/lib/api/browser-client";
import { ApiError } from "@/lib/api/api-error";

export interface LoginInput {
    email: string;
    password: string;
    remember: boolean;
}

export interface RegisterInput {
    name: string;
    email: string;

    password: string;
    passwordConfirmation: string;
}

export async function login(
    input: LoginInput,
): Promise<AuthUser> {
    const response =
        await browserApiRequest<AuthUserResponse>(
            "/api/v1/auth/login",
            {
                method: "POST",

                body: {
                    email: input.email,
                    password: input.password,
                    remember: input.remember,
                },
            },
        );

    return mapAuthUser(response.data);
}

export async function register(
    input: RegisterInput,
): Promise<AuthUser> {
    const response =
        await browserApiRequest<AuthUserResponse>(
            "/api/v1/auth/register",
            {
                method: "POST",

                body: {
                    name: input.name,
                    email: input.email,

                    password: input.password,

                    password_confirmation:
                    input.passwordConfirmation,
                },
            },
        );

    return mapAuthUser(response.data);
}

export async function logout(): Promise<void> {
    await browserApiRequest<{
        message: string;
    }>("/api/v1/auth/logout", {
        method: "POST",
    });
}

export async function getCurrentUser(): Promise<
    AuthUser | null
> {
    try {
        const response =
            await browserApiRequest<AuthUserResponse>(
                "/api/v1/me",
            );

        return mapAuthUser(response.data);
    } catch (error) {
        if (
            error instanceof ApiError &&
            error.status === 401
        ) {
            return null;
        }

        throw error;
    }
}