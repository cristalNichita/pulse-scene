<?php

namespace App\Services;

use App\DTOs\Auth\LoginData;
use App\DTOs\Auth\RegisterData;
use App\Models\User;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

final class AuthService
{
    public function register(RegisterData $data): User
    {
        $user = User::query()->create([
            'name' => $data->name,
            'email' => $data->email,
            'password' => Hash::make($data->password),
        ]);

        Auth::login($user);

        return $user;
    }

    /**
     * @throws AuthenticationException
     */
    public function login(LoginData $data): User
    {
        if (! Auth::attempt([
            'email' => $data->email,
            'password' => $data->password,
        ], $data->remember)) {
            throw new AuthenticationException(
                'The provided credentials are incorrect.',
            );
        }

        /** @var User $user */
        $user = Auth::user();

        return $user;
    }

    public function logout(): void
    {
        Auth::guard('web')->logout();
    }
}
