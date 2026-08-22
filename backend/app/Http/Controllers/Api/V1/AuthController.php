<?php

namespace App\Http\Controllers\Api\V1;

use App\DTOs\Auth\LoginData;
use App\DTOs\Auth\RegisterData;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Auth\LoginRequest;
use App\Http\Requests\Api\V1\Auth\RegisterRequest;
use App\Http\Resources\Api\V1\UserResource;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(
        private readonly AuthService $auth,
    ) {}

    public function register(
        RegisterRequest $request,
    ): UserResource {
        $user = $this->auth->register(
            RegisterData::fromArray(
                $request->validated(),
            ),
        );

        $request->session()->regenerate();

        return new UserResource($user);
    }

    public function login(
        LoginRequest $request,
    ): UserResource {
        $user = $this->auth->login(
            LoginData::fromArray(
                $request->validated(),
            ),
        );

        $request->session()->regenerate();

        return new UserResource($user);
    }

    public function logout(
        Request $request,
    ): JsonResponse {
        $this->auth->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Successfully logged out.',
        ]);
    }

    public function me(
        Request $request,
    ): UserResource {
        return new UserResource(
            $request->user(),
        );
    }
}
