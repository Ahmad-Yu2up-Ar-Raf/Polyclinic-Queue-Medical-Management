<?php

use Illuminate\Support\Facades\Route;

// Rute ini wajib merespons dengan 200 OK demi Hugging Face Health Check
Route::get('/', function () {
    return response()->json([
        'status' => 'healthy',
        'framework' => 'Laravel Octane + FrankenPHP',
        'message' => 'LiveUp API is running smoothly!'
    ], 200);
});
