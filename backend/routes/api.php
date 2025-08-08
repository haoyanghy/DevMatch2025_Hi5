<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Demo Traders API
Route::get('/traders', function () {
    $traders = [
        [
            "id" => 1,
            "username" => "AlphaWolf",
            "strategy" => "Day Trading Crypto",
            "performance" => 86,
            "risk" => "Medium",
            "asset" => "Crypto",
            "verified" => true,
            "bio" => "Trading since 2018. Specializes in BTC/ETH volatility arbs.",
            "chart" => "https://placehold.co/350x90?text=AlphaWolf+Chart"
        ],
        [
            "id" => 2,
            "username" => "ZenInvestor",
            "strategy" => "Swing Trading Stocks",
            "performance" => 64,
            "risk" => "Low",
            "asset" => "Stocks",
            "verified" => true,
            "bio" => "Low-risk blue-chip stock trader. Long-term focused.",
            "chart" => "https://placehold.co/350x90?text=ZenInvestor+Chart"
        ],
        [
            "id" => 3,
            "username" => "RiskyBiz",
            "strategy" => "Options Momentum",
            "performance" => 120,
            "risk" => "High",
            "asset" => "Options",
            "verified" => false,
            "bio" => "Lover of volatility, big moves (big wins and big losses!).",
            "chart" => "https://placehold.co/350x90?text=RiskyBiz+Chart"
        ]
    ];
    return response()->json($traders);
});

Route::get('/traders/{id}', function ($id) {
    $traders = [
        [
            "id" => 1,
            "username" => "AlphaWolf",
            "strategy" => "Day Trading Crypto",
            "performance" => 86,
            "risk" => "Medium",
            "asset" => "Crypto",
            "verified" => true,
            "bio" => "Trading since 2018. Specializes in BTC/ETH volatility arbs.",
            "chart" => "https://placehold.co/350x90?text=AlphaWolf+Chart"
        ],
        [
            "id" => 2,
            "username" => "ZenInvestor",
            "strategy" => "Swing Trading Stocks",
            "performance" => 64,
            "risk" => "Low",
            "asset" => "Stocks",
            "verified" => true,
            "bio" => "Low-risk blue-chip stock trader. Long-term focused.",
            "chart" => "https://placehold.co/350x90?text=ZenInvestor+Chart"
        ],
        [
            "id" => 3,
            "username" => "RiskyBiz",
            "strategy" => "Options Momentum",
            "performance" => 120,
            "risk" => "High",
            "asset" => "Options",
            "verified" => false,
            "bio" => "Lover of volatility, big moves (big wins and big losses!).",
            "chart" => "https://placehold.co/350x90?text=RiskyBiz+Chart"
        ]
    ];
    $found = collect($traders)->firstWhere('id', (int)$id);
    if ($found) {
        return response()->json($found);
    } else {
        return response()->json(['error' => 'Not found'], 404);
    }
});

// User Authentication Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected profile route
Route::middleware('auth:sanctum')->put('/profile', [AuthController::class, 'updateProfile']);