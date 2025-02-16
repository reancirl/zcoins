<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ActivationCodeController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Controllers\PendingMemberController;
use App\Http\Controllers\MemberController;

Route::get('/', function () {
    return redirect('/login');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::middleware([AdminMiddleware::class])->group(function () {
        // Show activation codes
        Route::get('/activation-codes', [ActivationCodeController::class, 'index'])
            ->name('activation-codes');

        // Generate new activation codes (POST request)
        Route::post('/activation-codes/generate', [ActivationCodeController::class, 'generate'])
            ->name('activation-codes.generate');
    });

    Route::middleware(['auth', 'verified', AdminMiddleware::class])->group(function () {
        // Pending Members page (lists all pending users)
        Route::get('/pending-members', [PendingMemberController::class, 'index'])
            ->name('pending-members');

        // Process pending member update (approve member)
        Route::post('/pending-members/{id}', [PendingMemberController::class, 'update'])
            ->name('pending-members.update');
    });

    Route::middleware(['auth', 'verified', AdminMiddleware::class])->group(function () {
        Route::get('/members', [MemberController::class, 'index'])->name('members');
    });    
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
