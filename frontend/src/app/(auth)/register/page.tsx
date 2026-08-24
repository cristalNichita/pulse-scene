import type { Metadata } from "next";

import { AuthShell } from "@/features/auth/components/auth-shell";
import { RegisterForm } from "@/features/auth/components/register-form";

export const metadata: Metadata = {
    title: "Create account",
};

export default function RegisterPage() {
    return (
        <AuthShell
            eyebrow="Join Pulse"
            title="Make plans worth keeping."
            description="Create an account to save events, book tickets and keep everything ready for the night."
        >
            <RegisterForm />
        </AuthShell>
    );
}