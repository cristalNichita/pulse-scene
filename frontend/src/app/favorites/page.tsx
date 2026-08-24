import type { Metadata } from "next";

import { FavoritesPageContent } from "@/features/favorites/components/favorites-page-content";

export const metadata: Metadata = {
    title: "Saved events",
    description:
        "Your saved events on Pulse.",
};

export default function FavoritesPage() {
    return <FavoritesPageContent />;
}