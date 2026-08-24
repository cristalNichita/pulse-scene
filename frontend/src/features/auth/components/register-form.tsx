"use client";

import Link from "next/link";
import {useRouter} from "next/navigation";
import {
    type SyntheticEvent,
    useState,
} from "react";

import {AuthField} from "@/features/auth/components/auth-field";
import { useRegister } from "@/features/auth/hooks/use-register";
import {
    getApiErrorMessage,
    getApiValidationErrors,
} from "@/lib/api/errors";

interface RegisterFormProps {
    redirectTo?: string;
}

export function RegisterForm({
                                 redirectTo = "/",
                             }: RegisterFormProps) {
    const router = useRouter();
    const register = useRegister();

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [
        passwordConfirmation,
        setPasswordConfirmation,
    ] = useState("");

    const [errors, setErrors] =
        useState<Record<string, string>>({});

    const [message, setMessage] =
        useState<string | null>(null);

    async function handleSubmit(
        event: SyntheticEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        setErrors({});
        setMessage(null);

        try {
            await register.mutateAsync({
                name,
                email,
                password,
                passwordConfirmation,
            });

            router.push(redirectTo);
            router.refresh();
        } catch (error) {
            setErrors(
                getApiValidationErrors(error),
            );

            setMessage(
                getApiErrorMessage(
                    error,
                    "We couldn't create your account.",
                ),
            );
        }
    }

    const loginHref =
        redirectTo === "/"
            ? "/login"
            : `/login?next=${encodeURIComponent(
                redirectTo,
            )}`;

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            <AuthField
                id="name"
                label="Name"
                autoComplete="name"
                value={name}
                error={errors.name}
                onChange={(event) =>
                    setName(event.target.value)
                }
                required
            />

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
                autoComplete="new-password"
                value={password}
                error={errors.password}
                onChange={(event) =>
                    setPassword(event.target.value)
                }
                required
            />

            <AuthField
                id="password-confirmation"
                label="Confirm password"
                type="password"
                autoComplete="new-password"
                value={passwordConfirmation}
                onChange={(event) =>
                    setPasswordConfirmation(
                        event.target.value,
                    )
                }
                required
            />

            {message ? (
                <div className="rounded-2xl border border-accent/15 bg-accent/5 px-4 py-3 text-sm text-accent">
                    {message}
                </div>
            ) : null}

            <button
                type="submit"
                disabled={register.isPending}
                className="h-14 w-full rounded-pill bg-accent text-sm font-semibold text-white transition hover:bg-accent-hover disabled:pointer-events-none disabled:opacity-60"
            >
                {register.isPending
                    ? "Creating account..."
                    : "Create account"}
            </button>

            <p className="pt-2 text-center text-sm text-ink/45">
                Already have an account?{" "}

                <Link
                    href={loginHref}
                    className="font-semibold text-ink transition hover:text-accent"
                >
                    Sign in
                </Link>
            </p>
        </form>
    );
}