"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    getCurrentUser,
    login as loginRequest,
    logout as logoutRequest,
    register as registerRequest,
    type LoginInput,
    type RegisterInput,
} from "@/features/auth/api/auth-api";
import type { AuthUser } from "@/features/auth/types/auth-user";

type AuthStatus =
    | "loading"
    | "authenticated"
    | "guest";

interface AuthContextValue {
    user: AuthUser | null;
    status: AuthStatus;

    login: (
        input: LoginInput,
    ) => Promise<AuthUser>;

    register: (
        input: RegisterInput,
    ) => Promise<AuthUser>;

    logout: () => Promise<void>;

    refreshUser: () => Promise<void>;
}

const AuthContext =
    createContext<AuthContextValue | null>(
        null,
    );

interface AuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider({
                                 children,
                             }: AuthProviderProps) {
    const [user, setUser] =
        useState<AuthUser | null>(null);

    const [status, setStatus] =
        useState<AuthStatus>("loading");

    const applyUser = useCallback(
        (currentUser: AuthUser | null) => {
            setUser(currentUser);

            setStatus(
                currentUser
                    ? "authenticated"
                    : "guest",
            );
        },
        [],
    );

    const refreshUser = useCallback(
        async () => {
            const currentUser =
                await getCurrentUser();

            applyUser(currentUser);
        },
        [applyUser],
    );

    useEffect(() => {
        let isActive = true;

        getCurrentUser()
            .then((currentUser) => {
                if (!isActive) {
                    return;
                }

                applyUser(currentUser);
            })
            .catch(() => {
                if (!isActive) {
                    return;
                }

                applyUser(null);
            });

        return () => {
            isActive = false;
        };
    }, [applyUser]);

    const login = useCallback(
        async (input: LoginInput) => {
            const authenticatedUser =
                await loginRequest(input);

            applyUser(authenticatedUser);

            return authenticatedUser;
        },
        [applyUser],
    );

    const register = useCallback(
        async (input: RegisterInput) => {
            const authenticatedUser =
                await registerRequest(input);

            applyUser(authenticatedUser);

            return authenticatedUser;
        },
        [applyUser],
    );

    const logout = useCallback(
        async () => {
            await logoutRequest();

            applyUser(null);
        },
        [applyUser],
    );

    const value = useMemo(
        () => ({
            user,
            status,
            login,
            register,
            logout,
            refreshUser,
        }),
        [
            user,
            status,
            login,
            register,
            logout,
            refreshUser,
        ],
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider.",
        );
    }

    return context;
}