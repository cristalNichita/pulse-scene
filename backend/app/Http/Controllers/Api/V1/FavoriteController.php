<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\EventCollection;
use App\Services\FavoriteService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function __construct(
        private readonly FavoriteService $favorites,
    ) {}

    public function index(
        Request $request,
    ): EventCollection {
        return new EventCollection(
            $this->favorites->paginate(
                $request->user(),
            ),
        );
    }

    public function store(
        Request $request,
        string $slug,
    ): JsonResponse {
        $this->favorites->add(
            $request->user(),
            $slug,
        );

        return response()->json([
            'message' => 'Event saved to favorites.',
        ]);
    }

    public function destroy(
        Request $request,
        string $slug,
    ): JsonResponse {
        $this->favorites->remove(
            $request->user(),
            $slug,
        );

        return response()->json([
            'message' => 'Event removed from favorites.',
        ]);
    }
}
