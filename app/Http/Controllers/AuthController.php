<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:55',
            'check_number' => 'required|integer|unique:users',
            'role' => 'required|string',
            'email' => 'required|email|unique:users',
            'password'     => [
                'required',
                'string',
                Password::min(8)
                    ->mixedCase()   // Inalazimisha angalau Uppercase (herufi kubwa) na Lowercase
                    ->numbers()     // Inalazimisha angalau Namba moja
                    ->symbols(),    // Inalazimisha angalau Special Character moja (@, #, $, etc.)
            ],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'check_number' => $validated['check_number'],
            'role' => $validated['role'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
        ]);


        /** @var User $user */
        $token = $user->createToken('auth_token')->plainTextToken;

        return response(compact('user', 'token'), 201);
    }
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'check_number' => 'required|integer',
            'password' => [
                'required',
                'string',
            ]
        ]);

        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Provided credentials are incorrect'
            ], 401);
        }

        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response(compact('user', 'token'), 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully.'
        ]);
    }
}
