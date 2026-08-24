<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\CategoryController;
use App\Http\Controllers\Api\V1\EventController;
use App\Http\Controllers\Api\V1\FavoriteController;
use App\Http\Controllers\Api\V1\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'service' => 'Pulse Scene API',
    ]);
});

Route::prefix('v1')->group(function (): void {
    /*
    |--------------------------------------------------------------------------
    | Public discovery
    |--------------------------------------------------------------------------
    */

    Route::get('/home', HomeController::class);

    Route::get('/categories', [
        CategoryController::class,
        'index',
    ]);

    Route::get('/events', [
        EventController::class,
        'index',
    ]);

    Route::get('/events/{slug}', [
        EventController::class,
        'show',
    ]);

    /*
    |--------------------------------------------------------------------------
    | Authentication
    |--------------------------------------------------------------------------
    */

    Route::prefix('auth')->group(function (): void {
        Route::post('/register', [
            AuthController::class,
            'register',
        ]);

        Route::post('/login', [
            AuthController::class,
            'login',
        ]);
    });

    /*
    |--------------------------------------------------------------------------
    | Authenticated user
    |--------------------------------------------------------------------------
    */

    Route::middleware('auth:sanctum')->group(function (): void {
        Route::post('/auth/logout', [
            AuthController::class,
            'logout',
        ]);

        Route::get('/me', [
            AuthController::class,
            'me',
        ]);

        Route::get('/me/favorites', [
            FavoriteController::class,
            'index',
        ]);

        Route::post('/events/{slug}/favorite', [
            FavoriteController::class,
            'store',
        ]);

        Route::delete('/events/{slug}/favorite', [
            FavoriteController::class,
            'destroy',
        ]);
    });
});
