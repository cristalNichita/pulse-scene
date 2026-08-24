"use client";

import { AuthProvider } from "@/features/auth/context/auth-context";

interface ProvidersProps {
    children: React.ReactNode;
}

export function Providers({
                              children,
                          }: ProvidersProps) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}