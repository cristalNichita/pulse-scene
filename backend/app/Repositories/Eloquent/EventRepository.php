<?php

namespace App\Repositories\Eloquent;

use App\Contracts\Repositories\EventRepositoryInterface;
use App\DTOs\Event\EventFiltersData;
use App\Models\Event;
use Carbon\CarbonInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EventRepository implements EventRepositoryInterface
{
    public function paginatePublished(
        EventFiltersData $filters,
    ): LengthAwarePaginator {
        $query = Event::query()
            ->published()
            ->with([
                'category',
                'venue',
                'organizer',
            ]);

        $this->applySearch($query, $filters);
        $this->applyCategory($query, $filters);
        $this->applyLocation($query, $filters);
        $this->applyPrice($query, $filters);
        $this->applyDate($query, $filters);

        return $query
            ->orderBy('starts_at')
            ->paginate($filters->perPage)
            ->withQueryString();
    }

    public function findPublishedBySlug(string $slug): Event
    {
        return Event::query()
            ->published()
            ->with([
                'category',
                'venue',
                'organizer',
                'images',
                'reviews' => fn (HasMany $relation) => $relation
                    ->with('user')
                    ->limit(6),
            ])
            ->withCount('reviews')
            ->withAvg('reviews', 'rating')
            ->where('slug', $slug)
            ->firstOrFail();
    }

    private function applySearch(
        Builder $query,
        EventFiltersData $filters,
    ): void {
        if (! $filters->search) {
            return;
        }

        $search = '%'.$filters->search.'%';

        $query->where(function (Builder $query) use ($search): void {
            $query
                ->where('title', 'like', $search)
                ->orWhere('subtitle', 'like', $search)
                ->orWhere('description', 'like', $search);
        });
    }

    private function applyCategory(
        Builder $query,
        EventFiltersData $filters,
    ): void {
        if (! $filters->category) {
            return;
        }

        $query->whereHas(
            'category',
            fn (Builder $query) => $query->where(
                'slug',
                $filters->category,
            ),
        );
    }

    private function applyLocation(
        Builder $query,
        EventFiltersData $filters,
    ): void {
        if (! $filters->location) {
            return;
        }

        $query->whereHas(
            'venue',
            fn (Builder $query) => $query->where(
                'city',
                $filters->location,
            ),
        );
    }

    private function applyPrice(
        Builder $query,
        EventFiltersData $filters,
    ): void {
        match ($filters->price) {
            'free' => $query->where('price', 0),
            'paid' => $query->where('price', '>', 0),
            default => null,
        };
    }

    private function applyDate(
        Builder $query,
        EventFiltersData $filters,
    ): void {
        if ($filters->date === 'today') {
            $query->whereBetween('starts_at', [
                now()->startOfDay(),
                now()->endOfDay(),
            ]);

            return;
        }

        if ($filters->date !== 'this-weekend') {
            return;
        }

        $now = now();

        $weekendStart = match (true) {
            $now->isSaturday() => $now->copy()->startOfDay(),

            $now->isSunday() => $now
                ->copy()
                ->subDay()
                ->startOfDay(),

            default => $now
                ->copy()
                ->next(CarbonInterface::SATURDAY)
                ->startOfDay(),
        };

        $weekendEnd = $weekendStart
            ->copy()
            ->addDay()
            ->endOfDay();

        $query->whereBetween('starts_at', [
            $weekendStart,
            $weekendEnd,
        ]);
    }
}
