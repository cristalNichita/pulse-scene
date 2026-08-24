import type { Metadata } from "next";

import { AuthShell } from "@/features/auth/components/auth-shell";
import { LoginForm } from "@/features/auth/components/login-form";
import { getSafeRedirectPath } from "@/features/auth/lib/get-safe-redirect-path";

export const metadata: Metadata = {
    title: "Sign in",
};

interface LoginPageProps {
    searchParams: Promise<{
        next?: string | string[];
    }>;
}

export default async function LoginPage({
                                            searchParams,
                                        }: LoginPageProps) {
    const params = await searchParams;

    const redirectTo =
        getSafeRedirectPath(
            typeof params.next === "string"
                ? params.next
                : undefined,
        );

    return (
        <AuthShell
            eyebrow="Welcome back"
            title="Your next night starts here."
            description="Sign in to save events, manage bookings and keep your tickets in one place."
        >
            <LoginForm
                redirectTo={redirectTo}
            />
        </AuthShell>
    );
}