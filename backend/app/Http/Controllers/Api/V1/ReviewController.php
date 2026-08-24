<?php

namespace App\Http\Controllers\Api\V1;

use App\Exceptions\ReviewAlreadyExistsException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Review\StoreReviewRequest;
use App\Http\Resources\Api\V1\ReviewResource;
use App\Services\ReviewService;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class ReviewController extends Controller
{
    public function __construct(
        private readonly ReviewService $reviews,
    ) {}

    public function store(
        StoreReviewRequest $request,
        string $slug,
    ): JsonResponse {
        try {
            $review = $this->reviews->create(
                user: $request->user(),
                eventSlug: $slug,
                rating: $request->integer('rating'),
                body: $request->validated('body'),
            );
        } catch (
            ReviewAlreadyExistsException $exception
        ) {
            return response()->json([
                'message' => $exception->getMessage(),
            ], Response::HTTP_CONFLICT);
        }

        return (new ReviewResource($review))
            ->response()
            ->setStatusCode(
                Response::HTTP_CREATED,
            );
    }
}
