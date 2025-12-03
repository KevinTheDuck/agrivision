<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SocialAuthController;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ForumController;
use App\Http\Controllers\CommentController;

Route::get("/", [HomeController::class, "index"])->name("home");

Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

Route::post('/logout', function () {
    Auth::logout();
    return redirect('/');
})->name('logout');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update'); // Using POST for file upload support with Inertia sometimes easier, but PATCH is standard. Let's stick to POST for update with files or use _method: PATCH
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/user/{user}', [ProfileController::class, 'show'])->name('profile.show');

    // Forum Routes
    Route::get('/forum', [ForumController::class, 'index'])->name('forum.index');
    Route::get('/forum/create', [ForumController::class, 'create'])->name('forum.create');
    Route::post('/forum', [ForumController::class, 'store'])->name('forum.store');
    Route::get('/forum/{id}', [ForumController::class, 'show'])->name('forum.show');
    Route::post('/forum/{id}/vote', [ForumController::class, 'vote'])->name('forum.vote');
    Route::delete('/forum/{post}', [ForumController::class, 'destroy'])->name('forum.destroy');
    Route::post('/forum/{post}/lock', [ForumController::class, 'toggleLock'])->name('forum.toggleLock');
    Route::post('/forum/{post}/feature', [ForumController::class, 'toggleFeature'])->name('forum.toggleFeature');
    
    // Comment Routes
    Route::post('/comments', [CommentController::class, 'store'])->name('comments.store');
    Route::post('/comments/{id}/vote', [CommentController::class, 'vote'])->name('comments.vote');
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');
    Route::post('/comments/{comment}/pin', [CommentController::class, 'togglePin'])->name('comments.togglePin');
});

Route::get('/auth/{provider}/redirect', [SocialAuthController::class, 'redirect'])->name('social.redirect');
Route::get('/auth/{provider}/callback', [SocialAuthController::class, 'callback'])->name('social.callback');

