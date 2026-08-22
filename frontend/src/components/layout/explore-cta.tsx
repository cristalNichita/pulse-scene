import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/container";

export function ExploreCta() {
    return (
        <section className="overflow-hidden bg-accent text-white">
            <Container className="relative py-24 md:py-32">
                <div
                    aria-hidden="true"
                    className="absolute -right-20 -top-44 select-none text-[24rem] font-semibold leading-none -tracking-widest text-black/5.5 md:text-[34rem]"
                >
                    P
                </div>

                <div className="relative z-10 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
                    <div>
                        <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/65">
                            Your city is happening
                        </p>

                        <h2 className="max-w-4xl text-[clamp(3.5rem,8vw,8rem)] font-semibold uppercase leading-[0.8] tracking-[-0.075em]">
                            Don&apos;t miss
                            <span className="block">
                what&apos;s next.
              </span>
                        </h2>

                        <p className="mt-8 max-w-md text-base leading-7 text-white/70">
                            Discover something worth leaving the house for.
                        </p>
                    </div>

                    <Link
                        href="/events"
                        className="group flex w-fit items-center gap-6 rounded-pill bg-white py-3 pl-7 pr-3 text-sm font-semibold text-ink transition-transform duration-300 ease-smooth hover:-translate-y-1"
                    >
                        Explore events

                        <span className="flex size-11 items-center justify-center rounded-pill bg-ink text-white">
              <ArrowUpRight className="size-4.5 transition-transform duration-300 ease-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
                    </Link>
                </div>
            </Container>
        </section>
    );
}