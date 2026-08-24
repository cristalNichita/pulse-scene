"use client";

import { useMutation } from "@tanstack/react-query";

import {
    createReview,
    type CreateReviewInput,
} from "@/features/reviews/api/reviews-api";

export function useCreateReview() {
    return useMutation({
        mutationFn: (
            input: CreateReviewInput,
        ) => createReview(input),
    });
}