<?php

use App\Http\Controllers\AntrianController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\DokterController;
use App\Http\Controllers\JadwalController;
use App\Http\Controllers\MonitorController;
use App\Http\Controllers\OperatorController;
use App\Http\Controllers\OverviewController;
use App\Http\Controllers\PasienController;
use App\Http\Controllers\PoliController;
use Illuminate\Support\Facades\Route;


Route::prefix('v1')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('/register', [RegisteredUserController::class, 'store'])
            ->middleware('guest')
            ->name('register');

        Route::post('/login', [AuthenticatedSessionController::class, 'store'])
            ->middleware('guest')
            ->name('login');

        Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
            ->middleware('guest')
            ->name('password.email');

        Route::post('/reset-password', [NewPasswordController::class, 'store'])
            ->middleware('guest')
            ->name('password.store');

        Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
            ->middleware(['auth', 'signed', 'throttle:6,1'])
            ->name('verification.verify');

        Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
            ->middleware(['auth', 'throttle:6,1'])
            ->name('verification.send');

        Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
            ->middleware('auth:sanctum')
            ->name('logout');
    });

    Route::prefix('polis')->group(function () {
        Route::get('/', [PoliController::class, 'index'])->name('polis.index');
        Route::get('/select', [PoliController::class, 'select'])
            ->middleware(['auth:sanctum', 'role:pasien|admin'])
            ->name('polis.select');



        Route::get('/{poli}', [PoliController::class, 'show'])->name('polis.show');
        Route::post('/', [PoliController::class, 'store'])
            ->middleware(['auth:sanctum', 'role:admin'])
            ->name('polis.store');








        Route::put('/{poli}', [PoliController::class, 'update'])
            ->middleware(['auth:sanctum', 'role:admin'])
            ->name('polis.update');


        Route::delete('/{poli}', [PoliController::class, 'destroy'])
            ->middleware(['auth:sanctum', 'role:admin'])
            ->name('polis.destroy');
    });



    Route::prefix('jadwal')->group(function () {
        Route::get('/', [JadwalController::class, 'index'])->name('jadwal.index');
        Route::get('/select', [JadwalController::class, 'select'])->name('jadwal.select');
        Route::get('/{jadwal}', [JadwalController::class, 'show'])->name('jadwal.show');
        Route::post('/', [JadwalController::class, 'store'])
            ->middleware(['auth:sanctum', 'role:admin'])
            ->name('jadwal.store');

        Route::put('/{jadwal}', [JadwalController::class, 'update'])
            ->middleware(['auth:sanctum', 'role:admin'])
            ->name('jadwal.update');


        Route::delete('/{jadwal}', [JadwalController::class, 'destroy'])
            ->middleware(['auth:sanctum', 'role:admin'])
            ->name('jadwal.destroy');
    });

    Route::prefix('dokter')->group(function () {
        Route::get('/', [DokterController::class, 'index'])
            ->name('dokter.index');
        Route::get('/poli', [DokterController::class, 'getDokterByPoli'])
            ->name('dokter.poli');
        Route::put('/{dokter}', [DokterController::class, 'update'])
            ->middleware(['auth:sanctum', 'role:admin'])
            ->name('dokter.update');
        Route::get('/{dokter}', [DokterController::class, 'show'])
            ->name('dokter.show');

        Route::post('/', [DokterController::class, 'store'])
            ->middleware(['auth:sanctum', 'role:admin'])
            ->name('dokter.store');



        Route::delete('/{dokter}', [DokterController::class, 'destroy'])
            ->middleware(['auth:sanctum', 'role:admin'])
            ->name('dokter.destroy');
    });

    Route::prefix('pasien')->group(function () {
        Route::get('/', [PasienController::class, 'index'])
            ->name('pasien.index');
        Route::get('/select', [PasienController::class, 'select'])
            ->middleware(['auth:sanctum', 'role:pasien|admin'])
            ->name('pasien.select');

        Route::get('/{pasien}', [PasienController::class, 'show'])
            ->name('pasien.show');

        Route::post('/', [PasienController::class, 'store'])
            ->middleware(['auth:sanctum', 'role:admin|pasien'])
            ->name('pasien.store');

        Route::put('/{pasien}', [PasienController::class, 'update'])
            ->middleware(['auth:sanctum', 'role:admin'])
            ->name('pasien.update');

        Route::delete('/{pasien}', [PasienController::class, 'destroy'])
            ->middleware(['auth:sanctum', 'role:admin'])
            ->name('pasien.destroy');
    });

    Route::get('/overview', [AntrianController::class, 'overview'])
        ->middleware(['auth:sanctum', 'role:pasien'])
        ->name('overview.index');



    Route::prefix('antrian')->group(function () {



        Route::get('/', [AntrianController::class, 'index'])
            ->name('antrian.index');



        Route::get('/monitor', [AntrianController::class, 'monitor'])
            ->name('antrian.monitor');


        Route::get('/user', [AntrianController::class, 'antrianSaya'])
            ->middleware(['auth:sanctum', 'role:pasien'])
            ->name('antrian.user');


        Route::post('/cek', [AntrianController::class, 'cek'])
            ->middleware(['auth:sanctum', 'role:pasien'])
            ->name('antrian.cek');
        Route::post('/pendaftaranBaru', [AntrianController::class, 'pendaftaranBaru'])
            ->middleware(['auth:sanctum', 'role:admin|pasien'])
            ->name('antrian.pendaftaranBaru');

        Route::get('/{antrian}', [AntrianController::class, 'show'])
            ->name('antrian.show');

        Route::post('/', [AntrianController::class, 'store'])
            ->middleware(['auth:sanctum', 'role:admin|pasien'])
            ->name('antrian.store');






        Route::put('/{antrian}', [AntrianController::class, 'update'])
            ->middleware(['auth:sanctum', 'role:admin|pasien'])
            ->name('antrian.update');

        Route::delete('/{antrian}', [AntrianController::class, 'destroy'])
            ->middleware(['auth:sanctum', 'role:admin'])
            ->name('antrian.destroy');
    });




    Route::prefix('monitor')->group(function () {
        Route::get('/', [MonitorController::class, 'index'])
            ->name('monitor.index');
    });


    Route::prefix('overview')->group(function () {
        Route::get('/', [OverviewController::class, 'index'])
            ->middleware(['auth:sanctum', 'role:admin|operator'])
            ->name('overview.admin');
        Route::get('/pasien', [AntrianController::class, 'overview'])
            ->middleware(['auth:sanctum', 'role:pasien'])
            ->name('overview.pasien');
    });
    Route::prefix('overview')->middleware(['auth:sanctum', 'role:pasien'])->group(function () {});

    Route::prefix('operator')->middleware(['auth:sanctum', 'role:admin|operator'])->group(function () {
        Route::get('/{poli}', [OperatorController::class, 'index'])->name('operator.index');
        Route::get('/{poli}/{status}', [OperatorController::class, 'show'])->name('operator.show');
        Route::post('/{status}/{id}', [OperatorController::class, 'next'])->name('operator.next');
    });
});
