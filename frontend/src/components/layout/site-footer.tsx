import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/container";

const exploreLinks = [
    {
        label: "All events",
        href: "/events",
    },
    {
        label: "This weekend",
        href: "/events?date=this-weekend",
    },
    {
        label: "Free events",
        href: "/events?price=free",
    },
    {
        label: "Categories",
        href: "/#categories",
    },
];

const accountLinks = [
    {
        label: "Favorites",
        href: "/favorites",
    },
    {
        label: "My tickets",
        href: "/tickets",
    },
    {
        label: "Sign in",
        href: "/login",
    },
];

export function SiteFooter() {
    return (
        <footer className="bg-canvas text-white">
            <Container className="py-16 md:py-20">
                <div className="grid gap-14 border-b border-white/10 pb-16 md:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.7fr]">
                    <div>
                        <Link
                            href="/"
                            className="inline-block text-4xl font-semibold tracking-[-0.075em]"
                        >
                            PULSE
                            <span className="text-accent">.</span>
                        </Link>

                        <p className="mt-6 max-w-sm text-sm leading-6 text-white/40">
                            Discover concerts, culture, food, ideas and experiences happening
                            around Chișinău.
                        </p>
                    </div>

                    <div>
                        <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30">
                            Explore
                        </p>

                        <nav className="flex flex-col items-start gap-3">
                            {exploreLinks.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-sm text-white/60 transition-colors hover:text-white"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div>
                        <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30">
                            Your Pulse
                        </p>

                        <nav className="flex flex-col items-start gap-3">
                            {accountLinks.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-sm text-white/60 transition-colors hover:text-white"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>

                <div className="flex flex-col gap-5 pt-8 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © 2026 Pulse. Discover what&apos;s happening.
                    </p>

                    <Link
                        href="/events"
                        className="group flex w-fit items-center gap-2 text-white/45 transition-colors hover:text-white"
                    >
                        Find an event

                        <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                </div>
            </Container>
        </footer>
    );
}