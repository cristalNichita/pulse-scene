import type { Metadata } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import { Providers } from "@/app/providers";

import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Pulse",
    template: "%s — Pulse",
  },
  description:
      "Discover concerts, culture, nightlife and unforgettable experiences around you.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
      <html lang="en">
        <body className={`${geist.variable} ${cormorant.variable}`}>
          <Providers>
            {children}
          </Providers>
        </body>
      </html>
  );
}