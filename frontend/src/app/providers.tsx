"use client";

import { AuthProvider } from "@/features/auth/context/auth-context";
import { FavoritesProvider } from "@/features/favorites/context/favorites-context";

interface ProvidersProps {
    children: React.ReactNode;
}

export function Providers({
                              children,
                          }: ProvidersProps) {
    return (
        <AuthProvider>
            <FavoritesProvider>
                {children}
            </FavoritesProvider>
        </AuthProvider>
    );
}