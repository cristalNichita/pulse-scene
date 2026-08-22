<?php

namespace App\Http\Controllers\Api\V1;

use App\DTOs\Event\EventFiltersData;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Event\IndexEventRequest;
use App\Http\Resources\Api\V1\EventCollection;
use App\Http\Resources\Api\V1\EventDetailsResource;
use App\Services\EventService;

class EventController extends Controller
{
    public function __construct(
        private readonly EventService $events,
    ) {}

    public function index(
        IndexEventRequest $request,
    ): EventCollection {
        $filters = EventFiltersData::fromArray(
            $request->validated(),
        );

        return new EventCollection(
            $this->events->paginate($filters),
        );
    }

    public function show(
        string $slug,
    ): EventDetailsResource {
        return new EventDetailsResource(
            $this->events->findBySlug($slug),
        );
    }
}
