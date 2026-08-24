"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    type SyntheticEvent,
    useState,
} from "react";

import { AuthField } from "@/features/auth/components/auth-field";
import { useAuth } from "@/features/auth/context/auth-context";
import {
    getApiErrorMessage,
    getApiValidationErrors,
} from "@/lib/api/errors";

export function LoginForm() {
    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [remember, setRemember] =
        useState(false);

    const [errors, setErrors] =
        useState<Record<string, string>>({});

    const [message, setMessage] =
        useState<string | null>(null);

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    async function handleSubmit(
        event: SyntheticEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        setErrors({});
        setMessage(null);
        setIsSubmitting(true);

        try {
            await login({
                email,
                password,
                remember,
            });

            router.push("/");
            router.refresh();
        } catch (error) {
            setErrors(
                getApiValidationErrors(error),
            );

            setMessage(
                getApiErrorMessage(
                    error,
                    "We couldn't sign you in.",
                ),
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            <AuthField
                id="email"
                label="Email"
                type="email"
                autoComplete="email"
                value={email}
                error={errors.email}
                onChange={(event) =>
                    setEmail(event.target.value)
                }
                required
            />

            <AuthField
                id="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={password}
                error={errors.password}
                onChange={(event) =>
                    setPassword(event.target.value)
                }
                required
            />

            <label className="flex w-fit items-center gap-3 text-sm text-ink/55">
                <input
                    type="checkbox"
                    checked={remember}
                    onChange={(event) =>
                        setRemember(
                            event.target.checked,
                        )
                    }
                    className="size-4 accent-accent"
                />

                Keep me signed in
            </label>

            {message ? (
                <div className="rounded-2xl border border-accent/15 bg-accent/5 px-4 py-3 text-sm text-accent">
                    {message}
                </div>
            ) : null}

            <button
                type="submit"
                disabled={isSubmitting}
                className="h-14 w-full rounded-pill bg-ink text-sm font-semibold text-white transition hover:bg-canvas-soft disabled:pointer-events-none disabled:opacity-60"
            >
                {isSubmitting
                    ? "Signing in..."
                    : "Sign in"}
            </button>

            <p className="pt-2 text-center text-sm text-ink/45">
                New to Pulse?{" "}

                <Link
                    href="/register"
                    className="font-semibold text-ink transition hover:text-accent"
                >
                    Create an account
                </Link>
            </p>
        </form>
    );
}