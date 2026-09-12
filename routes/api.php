<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\HomeAdminController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
// Route::post('/booking', [BookingController::class, 'submitBooking']);

Route::middleware('auth:sanctum')->post(
    '/booking',
    [BookingController::class, 'SubmitBooking']
);
Route::middleware('auth:sanctum')->get(
    '/dashboard',
    [HomeController::class, 'Home']
);


// PROFILE 

Route::middleware('auth:sanctum')->get(
    '/profile',
    [ProfileController::class, 'Profile']
);

Route::middleware('auth:sanctum')->put(
    '/profile-update',
    [ProfileController::class, 'ContactUpdate']
);

Route::middleware('auth:sanctum')->put(
    '/password-update',
    [ProfileController::class, 'PasswordUpdate']
);


Route::middleware('auth:sanctum')->post(
    '/logout',
    [AuthController::class, 'logout']
);



// ADMIN
Route::middleware('auth:sanctum')->get(
    '/admin',
    [HomeAdminController::class, 'Admin']
);

Route::middleware('auth:sanctum')->put(
    '/admin/bookings/{id}/status',
    [HomeAdminController::class, 'updateStatus']
);

Route::middleware('auth:sanctum')->put(
    '/admin/bookings/',
    [HomeAdminController::class, 'AdminBookings']
);


Route::middleware('auth:sanctum')->get(
    '/users',
    [UsersController::class, 'Users']
);


Route::middleware('auth:sanctum')->put(
    '/admin/users/{id}',
    [UsersController::class, 'Edit']
);

Route::middleware('auth:sanctum')->delete(
    '/admin/users/{id}',
    [UsersController::class, 'Delete']
);
