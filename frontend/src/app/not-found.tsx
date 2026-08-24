import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center bg-canvas px-5 text-white sm:px-8">
            <div className="mx-auto w-full max-w-275">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">
                    404 · Lost the plot
                </p>

                <h1 className="mt-6 max-w-5xl text-[clamp(5rem,14vw,12rem)] font-semibold uppercase leading-[0.76] tracking-[-0.08em]">
                    Nothing
                    <span className="block text-accent">
            happening.
          </span>
                </h1>

                <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center">
                    <p className="max-w-md text-sm leading-6 text-white/45">
                        This page disappeared from the lineup.
                        There&apos;s probably something better happening nearby.
                    </p>

                    <Link
                        href="/events"
                        className="flex w-fit items-center gap-3 rounded-pill bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-accent hover:text-white"
                    >
                        Explore events
                        <ArrowUpRight className="size-4" />
                    </Link>
                </div>
            </div>
        </main>
    );
}