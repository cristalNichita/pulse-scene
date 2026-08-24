import type { EventApiReview } from "@/features/events/api/event-api.types";
import type { Review } from "@/features/reviews/types/review";
import { browserApiRequest } from "@/lib/api/browser-client";

interface ReviewApiResponse {
    data: EventApiReview;
}

export interface CreateReviewInput {
    eventSlug: string;
    rating: number;
    body: string;
}

function mapReview(
    review: EventApiReview,
): Review {
    return {
        id: review.id,

        rating: review.rating,
        body: review.body,

        author: {
            id: review.author.id,
            name: review.author.name,
        },

        createdAt: review.created_at,
    };
}

export async function createReview(
    input: CreateReviewInput,
): Promise<Review> {
    const response =
        await browserApiRequest<ReviewApiResponse>(
            `/api/v1/events/${encodeURIComponent(
                input.eventSlug,
            )}/reviews`,
            {
                method: "POST",

                body: {
                    rating: input.rating,

                    body:
                        input.body.trim() || null,
                },
            },
        );

    return mapReview(response.data);
}