<?php

namespace App\Providers;

use App\Contracts\Repositories\BookingRepositoryInterface;
use App\Contracts\Repositories\CategoryRepositoryInterface;
use App\Contracts\Repositories\EventRepositoryInterface;
use App\Contracts\Repositories\FavoriteRepositoryInterface;
use App\Repositories\Eloquent\BookingRepository;
use App\Repositories\Eloquent\CategoryRepository;
use App\Repositories\Eloquent\EventRepository;
use App\Repositories\Eloquent\FavoriteRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            EventRepositoryInterface::class,
            EventRepository::class,
        );

        $this->app->bind(
            CategoryRepositoryInterface::class,
            CategoryRepository::class,
        );

        $this->app->bind(
            FavoriteRepositoryInterface::class,
            FavoriteRepository::class,
        );

        $this->app->bind(
            BookingRepositoryInterface::class,
            BookingRepository::class,
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
