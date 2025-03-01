<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ActivationCodeController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\ActivationCodeHistoryController;
use App\Http\Controllers\SystemSettingsController;
use App\Http\Controllers\DownlineController;
use App\Http\Controllers\TransactionController;

Route::get('/', function () {
    return redirect('/member-login');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/qr', function () {
        return Inertia::render('QrCode');
    })->name('qr');

    Route::get('/downlines', [DownlineController::class, 'index'])->name('downlines');
    Route::get('/genealogy', [DownlineController::class, 'genealogy'])->name('genealogy');

    Route::get('/transactions', [TransactionController::class, 'index'])
        ->name('transactions');

    Route::post('/transactions/buy', [TransactionController::class, 'buyZcoins'])
        ->name('transactions.buyZcoins');

    Route::post('/transactions/sell', [TransactionController::class, 'sellZcoins'])
        ->name('transactions.sellZcoins');

    Route::get('/transactions/{transaction}/edit', [TransactionController::class, 'edit'])->name('transactions.edit');

    Route::put('/transactions/{transaction}', [TransactionController::class, 'update'])
        ->name('transactions.update');

    Route::middleware(['auth', 'verified', AdminMiddleware::class])->group(function () {
        Route::get('/activation-codes', [ActivationCodeController::class, 'index'])
            ->name('activation-codes');

        // Generate new activation codes (POST request)
        Route::post('/activation-codes/generate', [ActivationCodeController::class, 'generate'])
            ->name('activation-codes.generate');

        Route::get('/members', [MemberController::class, 'index'])->name('members');
        Route::post('/members/{member}/archive', [MemberController::class, 'archive'])->name('members.archive');

        Route::get('/activation-codes/history', [ActivationCodeHistoryController::class, 'index'])
            ->name('activation-codes.history');

        Route::get('/system-settings', [SystemSettingsController::class, 'index'])
            ->name('system-settings.index');
        Route::post('/system-settings', [SystemSettingsController::class, 'update'])
            ->name('system-settings.update');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
