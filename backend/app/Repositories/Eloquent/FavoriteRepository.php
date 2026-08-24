<?php

namespace App\Repositories\Eloquent;

use App\Contracts\Repositories\FavoriteRepositoryInterface;
use App\Models\Event;
use App\Models\Favorite;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class FavoriteRepository implements FavoriteRepositoryInterface
{
    public function paginateForUser(
        User $user,
        int $perPage,
    ): LengthAwarePaginator {
        return Event::query()
            ->published()
            ->with([
                'category',
                'venue',
            ])
            ->whereHas(
                'favorites',
                fn ($query) => $query->where(
                    'user_id',
                    $user->id,
                ),
            )
            ->orderByDesc(
                Favorite::query()
                    ->select('created_at')
                    ->whereColumn(
                        'favorites.event_id',
                        'events.id',
                    )
                    ->where(
                        'favorites.user_id',
                        $user->id,
                    )
                    ->limit(1),
            )
            ->paginate($perPage);
    }

    public function add(
        User $user,
        Event $event,
    ): void {
        Favorite::query()->firstOrCreate([
            'user_id' => $user->id,
            'event_id' => $event->id,
        ]);
    }

    public function remove(
        User $user,
        Event $event,
    ): void {
        Favorite::query()
            ->where('user_id', $user->id)
            ->where('event_id', $event->id)
            ->delete();
    }

    public function exists(
        User $user,
        Event $event,
    ): bool {
        return Favorite::query()
            ->where('user_id', $user->id)
            ->where('event_id', $event->id)
            ->exists();
    }
}
