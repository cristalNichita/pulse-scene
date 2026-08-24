export default function Loading() {
    return (
        <main className="min-h-screen bg-canvas text-white">
            <div className="mx-auto flex min-h-screen w-full max-w-360 flex-col px-5 py-8 sm:px-8 lg:px-12">
                <div className="flex items-center justify-between">
                    <div className="h-6 w-20 animate-pulse rounded-full bg-white/10" />

                    <div className="h-11 w-24 animate-pulse rounded-full bg-white/10" />
                </div>

                <div className="my-auto max-w-4xl py-24">
                    <div className="h-3 w-28 animate-pulse rounded-full bg-white/10" />

                    <div className="mt-8 space-y-4">
                        <div className="h-20 w-full animate-pulse rounded-2xl bg-white/10 sm:h-28" />
                        <div className="h-20 w-3/4 animate-pulse rounded-2xl bg-white/10 sm:h-28" />
                    </div>

                    <div className="mt-10 h-4 w-80 max-w-full animate-pulse rounded-full bg-white/10" />
                </div>
            </div>
        </main>
    );
}