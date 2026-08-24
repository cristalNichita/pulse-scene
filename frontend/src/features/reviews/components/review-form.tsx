"use client";

import {
    Star,
} from "lucide-react";
import {useRouter} from "next/navigation";
import {useState} from "react";

import {useCurrentUser} from "@/features/auth/hooks/use-current-user";
import {useCreateReview} from "@/features/reviews/hooks/use-create-review";
import {
    getApiErrorMessage,
    getApiValidationErrors,
} from "@/lib/api/errors";
import {cn} from "@/lib/cn";

interface ReviewFormProps {
    eventSlug: string;
}

export function ReviewForm({
                               eventSlug,
                           }: ReviewFormProps) {
    const router = useRouter();

    const {
        data: user,
        isPending: isAuthPending,
    } = useCurrentUser();

    const createReview =
        useCreateReview();

    const [rating, setRating] =
        useState(0);

    const [body, setBody] =
        useState("");

    const [message, setMessage] =
        useState<string | null>(null);

    const [
        validationErrors,
        setValidationErrors,
    ] = useState<Record<string, string>>({});

    async function handleSubmit() {
        if (isAuthPending) {
            return;
        }

        if (!user) {
            router.push(
                `/login?next=${encodeURIComponent(
                    `/events/${eventSlug}`,
                )}`,
            );

            return;
        }

        setMessage(null);
        setValidationErrors({});

        try {
            await createReview.mutateAsync({
                eventSlug,
                rating,
                body,
            });

            setBody("");
            setRating(0);

            setMessage(
                "Your review has been published.",
            );

            router.refresh();
        } catch (error) {
            setValidationErrors(
                getApiValidationErrors(error),
            );

            setMessage(
                getApiErrorMessage(
                    error,
                    "We couldn't publish your review.",
                ),
            );
        }
    }

    return (
        <div className="rounded-panel border border-ink/10 bg-white p-6 sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/35">
                Share your experience
            </p>

            <h3 className="mt-3 text-3xl font-medium tracking-tighter">
                How was it?
            </h3>

            <div className="mt-7 flex gap-2">
                {Array.from({
                    length: 5,
                }).map((_, index) => {
                    const value =
                        index + 1;

                    const active =
                        value <= rating;

                    return (
                        <button
                            key={value}
                            type="button"
                            aria-label={`${value} stars`}
                            onClick={() =>
                                setRating(value)
                            }
                            className="flex size-11 items-center justify-center rounded-full border border-ink/10 transition hover:border-accent"
                        >
                            <Star
                                className={cn(
                                    "size-5 transition",
                                    active
                                        ? "fill-accent text-accent"
                                        : "text-ink/20",
                                )}
                            />
                        </button>
                    );
                })}
            </div>

            {validationErrors.rating ? (
                <p className="mt-2 text-xs text-accent">
                    {validationErrors.rating}
                </p>
            ) : null}

            <textarea
                value={body}
                onChange={(event) =>
                    setBody(event.target.value)
                }
                maxLength={1500}
                placeholder="What made this event memorable?"
                className="mt-6 min-h-32 w-full resize-none rounded-2xl border border-ink/10 bg-paper p-4 text-sm leading-6 outline-none transition placeholder:text-ink/25 focus:border-ink/30 focus:ring-4 focus:ring-ink/[0.04]"
            />

            {validationErrors.body ? (
                <p className="mt-2 text-xs text-accent">
                    {validationErrors.body}
                </p>
            ) : null}

            {message ? (
                <p className="mt-4 text-sm text-ink/50">
                    {message}
                </p>
            ) : null}

            <button
                type="button"
                disabled={
                    createReview.isPending ||
                    rating === 0
                }
                onClick={handleSubmit}
                className="mt-6 rounded-pill bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent disabled:pointer-events-none disabled:opacity-30"
            >
                {createReview.isPending
                    ? "Publishing..."
                    : user
                        ? "Publish review"
                        : "Sign in to review"}
            </button>
        </div>
    );
}