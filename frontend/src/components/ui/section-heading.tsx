import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/cn";

interface SectionHeadingProps {
    eyebrow?: string;
    title: string;
    description?: string;
    actionLabel?: string;
    actionHref?: string;
    className?: string;
}

export function SectionHeading({
                                   eyebrow,
                                   title,
                                   description,
                                   actionLabel,
                                   actionHref,
                                   className,
                               }: SectionHeadingProps) {
    return (
        <div
            className={cn(
                "flex items-end justify-between gap-8",
                className,
            )}
        >
            <div>
                {eyebrow ? (
                    <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] opacity-45">
                        {eyebrow}
                    </p>
                ) : null}

                <h2 className="text-4xl font-medium tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                    {title}
                </h2>

                {description ? (
                    <p className="mt-5 max-w-xl text-sm leading-6 opacity-55 sm:text-base">
                        {description}
                    </p>
                ) : null}
            </div>

            {actionLabel && actionHref ? (
                <Link
                    href={actionHref}
                    className="group hidden shrink-0 items-center gap-3 pb-2 text-sm font-medium md:flex"
                >
                    {actionLabel}

                    <ArrowUpRight className="size-4 transition-transform duration-300 ease-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
            ) : null}
        </div>
    );
}