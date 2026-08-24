"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import {
    register,
    type RegisterInput,
} from "@/features/auth/api/auth-api";
import { authQueryKeys } from "@/features/auth/api/auth-query-keys";

export function useRegister() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (
            input: RegisterInput,
        ) => register(input),

        onSuccess: (user) => {
            queryClient.setQueryData(
                authQueryKeys.currentUser,
                user,
            );
        },
    });
}