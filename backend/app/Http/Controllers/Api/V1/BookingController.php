<?php

namespace App\Http\Controllers\Api\V1;

use App\DTOs\Booking\CreateBookingData;
use App\Exceptions\BookingCapacityExceededException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Booking\StoreBookingRequest;
use App\Http\Resources\Api\V1\BookingResource;
use App\Models\Booking;
use App\Services\BookingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class BookingController extends Controller
{
    public function __construct(
        private readonly BookingService $bookings,
    ) {}

    public function index(
        Request $request,
    ): AnonymousResourceCollection {
        return BookingResource::collection(
            $this->bookings->paginate(
                $request->user(),
            ),
        );
    }

    public function store(
        StoreBookingRequest $request,
    ): BookingResource|JsonResponse {
        try {
            $booking = $this->bookings->create(
                $request->user(),
                CreateBookingData::fromArray(
                    $request->validated(),
                ),
            );
        } catch (BookingCapacityExceededException $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
            ], 409);
        }

        return new BookingResource(
            $booking,
        );
    }

    public function show(
        Request $request,
        Booking $booking,
    ): BookingResource {
        $this->authorize(
            'view',
            $booking,
        );

        $booking->loadMissing([
            'event.category',
            'event.venue',
        ]);

        return new BookingResource(
            $booking,
        );
    }

    public function destroy(
        Request $request,
        Booking $booking,
    ): BookingResource {
        $booking->loadMissing('event');

        $this->authorize(
            'cancel',
            $booking,
        );

        $booking = $this->bookings->cancel(
            $booking,
        );

        $booking->load([
            'event.category',
            'event.venue',
        ]);

        return new BookingResource(
            $booking,
        );
    }
}
