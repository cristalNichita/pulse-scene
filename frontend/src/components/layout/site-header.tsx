import Link from "next/link";
import { MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const navigation = [
    {
        label: "Explore",
        href: "#explore",
    },
    {
        label: "Categories",
        href: "#categories",
    },
    {
        label: "My tickets",
        href: "/tickets",
    },
];

export function SiteHeader() {
    return (
        <header className="absolute inset-x-0 top-0 z-40">
            <Container className="flex h-24 items-center justify-between">
                <Link
                    href="/"
                    className="text-2xl font-semibold tracking-[-0.07em]"
                >
                    PULSE
                    <span className="text-accent">.</span>
                </Link>

                <nav className="hidden items-center gap-8 lg:flex">
                    {navigation.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm text-white/65 transition-colors duration-200 hover:text-white"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="hidden border-white/15 bg-white/5 text-white backdrop-blur-md hover:bg-white/10 sm:inline-flex"
                    >
                        <MapPin className="size-4" />
                        Chișinău
                    </Button>

                    <Button variant="light">
                        Sign in
                    </Button>
                </div>
            </Container>
        </header>
    );
}