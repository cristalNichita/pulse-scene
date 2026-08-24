import Image from "next/image";
import Link from "next/link";

interface AuthShellProps {
    eyebrow: string;
    title: string;
    description: string;

    children: React.ReactNode;
}

export function AuthShell({
                              eyebrow,
                              title,
                              description,
                              children,
                          }: AuthShellProps) {
    return (
        <main className="grid min-h-screen bg-paper text-ink lg:grid-cols-[1.05fr_0.95fr]">
            <section className="relative hidden min-h-screen overflow-hidden bg-canvas text-white lg:block">
                <Image
                    src="/images/events/electric-nights.jpg"
                    alt=""
                    fill
                    priority
                    className="object-cover opacity-65"
                    sizes="55vw"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black via-black/25 to-black/30" />

                <div className="relative z-10 flex min-h-screen flex-col justify-between p-12 xl:p-16">
                    <Link
                        href="/"
                        className="w-fit text-2xl font-semibold tracking-[-0.07em]"
                    >
                        PULSE
                        <span className="text-accent">.</span>
                    </Link>

                    <div>
                        <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
                            Your city is happening
                        </p>

                        <p className="max-w-2xl text-[clamp(4rem,7vw,7rem)] font-semibold uppercase leading-[0.8] tracking-[-0.075em]">
                            Find it.
                            <span className="block">
                Book it.
              </span>
                            <span className="block text-accent">
                Be there.
              </span>
                        </p>
                    </div>
                </div>
            </section>

            <section className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-8 lg:px-14">
                <div className="w-full max-w-117.5">
                    <Link
                        href="/"
                        className="mb-14 inline-block text-2xl font-semibold tracking-[-0.07em] lg:hidden"
                    >
                        PULSE
                        <span className="text-accent">.</span>
                    </Link>

                    <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/35">
                        {eyebrow}
                    </p>

                    <h1 className="text-5xl font-medium leading-[0.95] tracking-[-0.06em] sm:text-6xl">
                        {title}
                    </h1>

                    <p className="mt-5 max-w-md text-sm leading-6 text-ink/50">
                        {description}
                    </p>

                    <div className="mt-10">
                        {children}
                    </div>
                </div>
            </section>
        </main>
    );
}