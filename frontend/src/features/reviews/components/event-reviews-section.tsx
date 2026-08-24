import type { EventDetails } from "@/features/events/types/event-details";
import { ReviewForm } from "@/features/reviews/components/review-form";
import { ReviewStars } from "@/features/reviews/components/review-stars";

interface EventReviewsSectionProps {
    event: EventDetails;
}

export function EventReviewsSection({
                                        event,
                                    }: EventReviewsSectionProps) {
    return (
        <section className="border-t border-ink/10 pt-14">
            <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/35">
                        Guest reviews
                    </p>

                    <h2 className="mt-3 text-4xl font-medium tracking-[-0.055em]">
                        What people thought.
                    </h2>
                </div>

                {event.reviewCount > 0 ? (
                    <div className="flex items-center gap-4">
            <span className="text-4xl font-medium tracking-tighter">
              {event.rating.toFixed(1)}
            </span>

                        <div>
                            <ReviewStars
                                rating={Math.round(
                                    event.rating,
                                )}
                            />

                            <p className="mt-1 text-xs text-ink/35">
                                {event.reviewCount}{" "}
                                {event.reviewCount === 1
                                    ? "review"
                                    : "reviews"}
                            </p>
                        </div>
                    </div>
                ) : null}
            </div>

            <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
                <div>
                    {event.reviews.length > 0 ? (
                        <div className="divide-y divide-ink/10">
                            {event.reviews.map(
                                (review) => (
                                    <article
                                        key={review.id}
                                        className="py-7 first:pt-0"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">
                                                {review.author.name
                                                    .trim()
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex flex-wrap items-center justify-between gap-3">
                                                    <p className="font-semibold">
                                                        {review.author.name}
                                                    </p>

                                                    <ReviewStars
                                                        rating={
                                                            review.rating
                                                        }
                                                    />
                                                </div>

                                                {review.body ? (
                                                    <p className="mt-4 max-w-2xl text-sm leading-7 text-ink/55">
                                                        {review.body}
                                                    </p>
                                                ) : null}

                                                <p className="mt-4 text-xs text-ink/30">
                                                    {new Intl.DateTimeFormat(
                                                        "en",
                                                        {
                                                            month: "short",
                                                            day: "numeric",
                                                            year: "numeric",
                                                        },
                                                    ).format(
                                                        new Date(
                                                            review.createdAt,
                                                        ),
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </article>
                                ),
                            )}
                        </div>
                    ) : (
                        <div className="rounded-panel border border-dashed border-ink/15 px-6 py-16 text-center">
                            <p className="text-sm text-ink/40">
                                No reviews yet. Be the first
                                to share your experience.
                            </p>
                        </div>
                    )}
                </div>

                <ReviewForm
                    eventSlug={event.slug}
                />
            </div>
        </section>
    );
}