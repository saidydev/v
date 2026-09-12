<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function Profile(Request $Request)
    {
        $user = $Request->user();

        return response([
            'user' => $user
        ]);
    }

    public function ContactUpdate(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'email' => 'required|email',
            'phone' => 'required|string|max:10|min:10',
        ]);

        $user->email = $validated['email'];
        $user->phone = $validated['phone'];

        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully.',
            'user' => $user
        ]);
    }
    public function passwordUpdate(Request $request)
    {
        $validated = $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|min:8',
            'new_password_confirmation' => 'required|same:new_password',
        ]);

        $user = $request->user();

        // Check current password
        if (!Hash::check($validated['current_password'], $user->password)) {

            return response()->json([
                'success' => false,
                'message' => 'Current password is incorrect.'
            ], 422);
        }

        // Save new password
        $user->password = Hash::make($validated['new_password']);

        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Password updated successfully.'
        ]);
    }
}
