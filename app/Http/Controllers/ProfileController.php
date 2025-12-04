<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

use App\Models\User;

class ProfileController extends Controller
{
    /**
     * Display the user's public profile.
     */
    public function show(User $user, Request $request): Response
    {
        $posts = $user->posts()
            ->with(['categories', 'votes', 'user'])
            ->withCount('comments')
            ->latest()
            ->paginate(10, ['*'], 'posts_page')
            ->appends(['tab' => 'posts']);

        $comments = $user->comments()
            ->with(['post', 'votes'])
            ->latest()
            ->paginate(10, ['*'], 'comments_page')
            ->appends(['tab' => 'comments']);

        return Inertia::render('Profile/Show', [
            'profileUser' => $user,
            'posts' => $posts,
            'comments' => $comments,
            'initialTab' => $request->input('tab', 'posts'),
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $request->user()->id,
            'flair' => 'nullable|string|max:255',
            'avatar' => 'nullable|image|max:1024', // 1MB Max
        ]);

        $user = $request->user();
        $user->fill($request->only(['name', 'email', 'flair']));

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        if ($request->hasFile('avatar')) {
            if ($user->avatar && !str_starts_with($user->avatar, 'http')) {
                Storage::disk('public')->delete($user->avatar);
            }
            $path = $request->file('avatar')->store('avatars', 'public');
            $user->avatar = '/storage/' . $path;
        }

        $user->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
