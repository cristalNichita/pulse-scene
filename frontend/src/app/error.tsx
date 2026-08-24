"use client";

import { RotateCcw } from "lucide-react";

interface ErrorPageProps {
    error: Error & {
        digest?: string;
    };

    reset: () => void;
}

export default function ErrorPage({
                                      error,
                                      reset,
                                  }: ErrorPageProps) {
    return (
        <main className="flex min-h-screen items-center bg-canvas px-5 text-white sm:px-8">
            <div className="mx-auto w-full max-w-250">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                    Something went wrong
                </p>

                <h1 className="mt-6 max-w-4xl text-[clamp(4rem,10vw,9rem)] font-semibold uppercase leading-[0.78] tracking-[-0.075em]">
                    The show
                    <span className="block text-white/25">
            can&apos;t go on.
          </span>
                </h1>

                <p className="mt-8 max-w-lg text-sm leading-6 text-white/45">
                    We couldn&apos;t load this part of Pulse.
                    Try again and we&apos;ll give it another shot.
                </p>

                {process.env.NODE_ENV === "development" ? (
                    <p className="mt-4 max-w-2xl wrap-break-word font-mono text-xs text-white/25">
                        {error.message}
                    </p>
                ) : null}

                <button
                    type="button"
                    onClick={reset}
                    className="mt-8 flex items-center gap-3 rounded-pill bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-accent hover:text-white"
                >
                    <RotateCcw className="size-4" />
                    Try again
                </button>
            </div>
        </main>
    );
}