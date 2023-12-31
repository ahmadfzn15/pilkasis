<?php

use App\Http\Controllers\CandidateController;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\VotingController;
use Illuminate\Support\Facades\Route;

Route::post("/signin/siswa", [PagesController::class, "signInSiswa"])->name("signin.siswa");
Route::post("/signin/admin", [PagesController::class, "signInAdmin"])->name("signin.admin");

Route::controller(VotingController::class)->group(function () {
    Route::get('admin/voter/get', 'get')->name("voter.data");
    Route::get('admin/voting/result', 'result')->name("voting.result");
    Route::post('admin/voter/generate', 'generate')->name("generate.voter");
    Route::delete('admin/voter/truncate', 'truncate')->name("delete.voter");
    Route::post('voting', 'vote')->name("vote");
});

Route::controller(CandidateController::class)->group(function () {
    Route::get('admin/candidate', 'get')->name("candidate.data");
    Route::post('admin/candidate', 'store')->name("candidate.store");
    Route::post('admin/candidate/{id}', 'update')->name("candidate.update");
    Route::delete('admin/candidate/{id}', 'delete')->name("candidate.delete");
});
