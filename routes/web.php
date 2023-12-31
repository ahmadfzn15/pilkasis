<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\VotingController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('/signin/siswa', [AuthenticatedSessionController::class, "siswa"])->name("login.siswa");
    Route::get('/signin/admin', [AuthenticatedSessionController::class, "admin"])->name("login.admin");
    Route::get('/admin/voter', [VotingController::class, "voter"])->name("voter");
    Route::get('/admin/voter/print', [VotingController::class, "print"])->name("voter.print");
    Route::get('/admin/candidate', [CandidateController::class, "index"])->name("candidate");
    Route::get('/admin/dashboard', [PagesController::class, "index"])->name("dashboard");
    Route::get('/admin/setting', [PagesController::class, "setting"])->name("setting");
});

Route::middleware(['auth'])->group(function () {
    Route::get('/voting', [VotingController::class, "index"])->name("voting");
});

Route::middleware(['siswa'])->group(function () {
});

Route::middleware(['admin'])->group(function () {
});
