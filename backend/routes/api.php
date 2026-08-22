<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\CategoryController;
use App\Http\Controllers\Api\V1\EventController;
use App\Http\Controllers\Api\V1\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'service' => 'Pulse Scene API',
    ]);
});

Route::prefix('v1')->group(function (): void {
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

    Route::get('/home', HomeController::class);

    Route::prefix('auth')->group(function (): void {
        Route::post('/register', [
            AuthController::class,
            'register',
        ]);

        Route::post('/login', [
            AuthController::class,
            'login',
        ]);

        Route::middleware('auth:sanctum')->group(function (): void {
            Route::post('/logout', [
                AuthController::class,
                'logout',
            ]);
        });
    });

    Route::middleware('auth:sanctum')->get('/me', [
        AuthController::class,
        'me',
    ]);
});
