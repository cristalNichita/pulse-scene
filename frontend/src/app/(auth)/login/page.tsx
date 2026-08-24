import type { Metadata } from "next";

import { AuthShell } from "@/features/auth/components/auth-shell";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
    title: "Sign in",
};

export default function LoginPage() {
    return (
        <AuthShell
            eyebrow="Welcome back"
            title="Your next night starts here."
            description="Sign in to save events, manage bookings and keep your tickets in one place."
        >
            <LoginForm />
        </AuthShell>
    );
}