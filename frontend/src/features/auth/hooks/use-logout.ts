"use client";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { logout } from "@/features/auth/api/auth-api";
import { authQueryKeys } from "@/features/auth/api/auth-query-keys";

export function useLogout() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logout,

        onSuccess: () => {
            queryClient.setQueryData(
                authQueryKeys.currentUser,
                null,
            );
        },
    });
}