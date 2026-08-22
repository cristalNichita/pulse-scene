<?php

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
});
