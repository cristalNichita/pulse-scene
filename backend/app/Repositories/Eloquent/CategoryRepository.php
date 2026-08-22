<?php

namespace App\Repositories\Eloquent;

use App\Contracts\Repositories\CategoryRepositoryInterface;
use App\Models\Category;
use Illuminate\Support\Collection;

class CategoryRepository implements CategoryRepositoryInterface
{
    public function all(): Collection
    {
        return Category::query()
            ->withCount([
                'events' => fn ($query) => $query->published(),
            ])
            ->orderBy('name')
            ->get();
    }
}
