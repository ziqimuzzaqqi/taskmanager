<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TaskController;

use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// Protected routes (memerlukan token valid)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user',      [AuthController::class, 'user']);
    Route::post('/logout',   [AuthController::class, 'logout']);
    Route::apiResource('tasks', TaskController::class);
});
