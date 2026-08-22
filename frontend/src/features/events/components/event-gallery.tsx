import Image from "next/image";

interface EventGalleryProps {
    images: string[];
    title: string;
}

export function EventGallery({
                                 images,
                                 title,
                             }: EventGalleryProps) {
    if (images.length < 2) {
        return null;
    }

    const [primaryImage, ...secondaryImages] = images;

    return (
        <section className="mt-16">
            <div className="mb-7 flex items-end justify-between">
                <div>
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/35">
                        Inside the experience
                    </p>

                    <h2 className="text-3xl font-medium tracking-[-0.045em] sm:text-4xl">
                        A glimpse of the night
                    </h2>
                </div>
            </div>

            <div className="grid min-h-130 gap-3 md:grid-cols-2">
                <div className="relative min-h-100 overflow-hidden rounded-card md:min-h-0">
                    <Image
                        src={primaryImage}
                        alt={`${title} gallery`}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                    />
                </div>

                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
                    {secondaryImages.slice(0, 2).map((image, index) => (
                        <div
                            key={image}
                            className="relative min-h-62.5 overflow-hidden rounded-card"
                        >
                            <Image
                                src={image}
                                alt={`${title} gallery ${index + 2}`}
                                fill
                                sizes="(min-width: 768px) 50vw, 100vw"
                                className="object-cover transition-transform duration-700 ease-smooth hover:scale-[1.025]"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}