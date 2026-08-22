<?php

namespace Tests\Feature\Api\V1;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        config([
            'sanctum.stateful' => [
                'localhost:3000',
            ],
        ]);

        $this->withHeaders([
            'Origin' => 'http://localhost:3000',
            'Referer' => 'http://localhost:3000/',
        ]);
    }

    public function test_user_can_register(): void
    {
        $response = $this->postJson(
            '/api/v1/auth/register',
            [
                'name' => 'Alex Morgan',
                'email' => 'alex@example.com',
                'password' => 'password123',
                'password_confirmation' => 'password123',
            ],
        );

        $response
            ->assertCreated()
            ->assertJsonPath(
                'data.email',
                'alex@example.com',
            );

        $this->assertDatabaseHas('users', [
            'email' => 'alex@example.com',
        ]);

        $this->assertAuthenticated();
    }

    public function test_registration_validates_duplicate_email(): void
    {
        User::factory()->create([
            'email' => 'alex@example.com',
        ]);

        $this
            ->postJson(
                '/api/v1/auth/register',
                [
                    'name' => 'Alex Morgan',
                    'email' => 'alex@example.com',
                    'password' => 'password123',
                    'password_confirmation' => 'password123',
                ],
            )
            ->assertUnprocessable()
            ->assertJsonValidationErrors([
                'email',
            ]);
    }

    public function test_user_can_login(): void
    {
        User::factory()->create([
            'email' => 'alex@example.com',
            'password' => Hash::make(
                'password123',
            ),
        ]);

        $response = $this->postJson(
            '/api/v1/auth/login',
            [
                'email' => 'alex@example.com',
                'password' => 'password123',
            ],
        );

        $response
            ->assertOk()
            ->assertJsonPath(
                'data.email',
                'alex@example.com',
            );

        $this->assertAuthenticated();
    }

    public function test_login_rejects_invalid_credentials(): void
    {
        User::factory()->create([
            'email' => 'alex@example.com',
            'password' => Hash::make(
                'password123',
            ),
        ]);

        $this
            ->postJson(
                '/api/v1/auth/login',
                [
                    'email' => 'alex@example.com',
                    'password' => 'wrong-password',
                ],
            )
            ->assertUnauthorized();

        $this->assertGuest();
    }

    public function test_authenticated_user_can_fetch_their_profile(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user);

        $this
            ->getJson('/api/v1/me')
            ->assertOk()
            ->assertJsonPath(
                'data.id',
                $user->id,
            );
    }

    public function test_guest_cannot_fetch_profile(): void
    {
        $this
            ->getJson('/api/v1/me')
            ->assertUnauthorized();
    }

    public function test_user_can_logout(): void
    {
        User::factory()->create([
            'email' => 'alex@example.com',
            'password' => Hash::make(
                'password123',
            ),
        ]);

        $this
            ->postJson(
                '/api/v1/auth/login',
                [
                    'email' => 'alex@example.com',
                    'password' => 'password123',
                ],
            )
            ->assertOk();

        $this
            ->postJson('/api/v1/auth/logout')
            ->assertOk()
            ->assertJsonPath(
                'message',
                'Successfully logged out.',
            );

        $this->assertGuest('web');

        $this->app['auth']->forgetGuards();

        $this
            ->getJson('/api/v1/me')
            ->assertUnauthorized();
    }
}
