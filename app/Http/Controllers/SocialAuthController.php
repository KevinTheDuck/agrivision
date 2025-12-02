<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function callback($provider)
    {
        try {
            $socialUser = Socialite::driver($provider)->stateless()->user();
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Social auth error: ' . $e->getMessage());
            return redirect()->route('login')->with('error', 'Authentication failed.');
        }

        $user = User::where('email', $socialUser->getEmail())->first();

        if ($user) {
            $dataToUpdate = [
                'provider' => $provider,
                'provider_id' => $socialUser->getId(),
            ];

            // Only update avatar if the user doesn't have a custom one (local storage)
            // or if the current avatar is a social URL (starts with http)
            if (!$user->avatar || str_starts_with($user->avatar, 'http')) {
                $dataToUpdate['avatar'] = $socialUser->getAvatar();
            }

            $user->update($dataToUpdate);
        } else {
            $user = User::create([
                'name' => $socialUser->getName() ?? $socialUser->getNickname(),
                'email' => $socialUser->getEmail(),
                'provider' => $provider,
                'provider_id' => $socialUser->getId(),
                'avatar' => $socialUser->getAvatar(),
                'password' => Hash::make(Str::random(24)),
            ]);
        }

        Auth::login($user);

        return redirect()->route('home');
    }
}
