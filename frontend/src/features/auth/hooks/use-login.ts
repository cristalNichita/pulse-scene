"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import {
    login,
    type LoginInput,
} from "@/features/auth/api/auth-api";
import { authQueryKeys } from "@/features/auth/api/auth-query-keys";

export function useLogin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (
            input: LoginInput,
        ) => login(input),

        onSuccess: (user) => {
            queryClient.setQueryData(
                authQueryKeys.currentUser,
                user,
            );
        },
    });
}