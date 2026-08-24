"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Heart,
    LogOut,
    Ticket,
    UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { useLogout } from "@/features/auth/hooks/use-logout";

export function AuthHeaderActions() {
    const router = useRouter();

    const {
        data: user,
        isPending,
    } = useCurrentUser();

    const logout = useLogout();

    async function handleLogout() {
        await logout.mutateAsync();

        router.push("/");
        router.refresh();
    }

    if (isPending) {
        return (
            <div className="h-12 w-20 animate-pulse rounded-pill bg-white/10" />
        );
    }

    if (!user) {
        return (
            <Button
                variant="light"
                onClick={() =>
                    router.push("/login")
                }
            >
                Sign in
            </Button>
        );
    }

    return (
        <details className="group relative">
            <summary className="flex h-12 list-none items-center gap-3 rounded-pill bg-white py-1.5 pl-2 pr-4 text-ink transition hover:bg-paper [&::-webkit-details-marker]:hidden">
        <span className="flex size-9 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white">
          {user.name
              .trim()
              .charAt(0)
              .toUpperCase()}
        </span>

                <span className="hidden max-w-28 truncate text-sm font-medium sm:block">
          {user.name}
        </span>
            </summary>

            <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-64 overflow-hidden rounded-card border border-black/10 bg-paper p-2 text-ink shadow-floating">
                <div className="border-b border-ink/10 px-3 pb-3 pt-2">
                    <p className="truncate text-sm font-semibold">
                        {user.name}
                    </p>

                    <p className="mt-1 truncate text-xs text-ink/45">
                        {user.email}
                    </p>
                </div>

                <nav className="py-2">
                    <Link
                        href="/favorites"
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition hover:bg-ink/5"
                    >
                        <Heart className="size-4 text-ink/45" />
                        Favorites
                    </Link>

                    <Link
                        href="/tickets"
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition hover:bg-ink/5"
                    >
                        <Ticket className="size-4 text-ink/45" />
                        My tickets
                    </Link>

                    <Link
                        href="/profile"
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition hover:bg-ink/5"
                    >
                        <UserRound className="size-4 text-ink/45" />
                        Profile
                    </Link>
                </nav>

                <div className="border-t border-ink/10 pt-2">
                    <button
                        type="button"
                        disabled={logout.isPending}
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition hover:bg-ink/5 disabled:opacity-50"
                    >
                        <LogOut className="size-4 text-ink/45" />

                        {logout.isPending
                            ? "Signing out..."
                            : "Sign out"}
                    </button>
                </div>
            </div>
        </details>
    );
}