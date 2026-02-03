<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginChallengeController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/get-challenge', [LoginChallengeController::class, 'getChallenge']);

Route::post('/login-check', [LoginChallengeController::class, 'login']);