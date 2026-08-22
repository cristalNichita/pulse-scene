<?php

namespace App\Repositories\Eloquent;

use App\Contracts\Repositories\EventRepositoryInterface;
use App\DTOs\Event\EventFiltersData;
use App\Models\Event;
use Carbon\CarbonInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;

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

        [$start, $end] = $this->weekendRange();

        $query->whereBetween('starts_at', [
            $start,
            $end,
        ]);
    }

    public function findFeatured(): ?Event
    {
        return $this
            ->homepageQuery()
            ->where('is_featured', true)
            ->orderBy('starts_at')
            ->first();
    }

    public function trending(int $limit): Collection
    {
        return $this
            ->homepageQuery()
            ->where('is_trending', true)
            ->orderBy('starts_at')
            ->limit($limit)
            ->get();
    }

    public function weekend(int $limit): Collection
    {
        [$start, $end] = $this->weekendRange();

        return $this
            ->homepageQuery()
            ->where('is_featured', false)
            ->where('is_trending', false)
            ->whereBetween('starts_at', [
                $start,
                $end,
            ])
            ->orderBy('starts_at')
            ->limit($limit)
            ->get();
    }

    public function popular(int $limit): Collection
    {
        return $this
            ->homepageQuery()
            ->where('is_popular', true)
            ->orderBy('starts_at')
            ->limit($limit)
            ->get();
    }

    private function homepageQuery(): Builder
    {
        return Event::query()
            ->published()
            ->where('starts_at', '>=', now())
            ->with([
                'category',
                'venue',
            ]);
    }

    private function weekendRange(): array
    {
        $now = now();

        $start = $now->isSaturday()
            ? $now->copy()->startOfDay()
            : $now
                ->copy()
                ->next(CarbonInterface::SATURDAY)
                ->startOfDay();

        return [
            $start,
            $start
                ->copy()
                ->addDay()
                ->endOfDay(),
        ];
    }
}
