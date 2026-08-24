"use client";

import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "@/features/auth/api/auth-api";
import { authQueryKeys } from "@/features/auth/api/auth-query-keys";

export function useCurrentUser() {
    return useQuery({
        queryKey: authQueryKeys.currentUser,
        queryFn: getCurrentUser,

        staleTime: 60_000,
        retry: false,
    });
}