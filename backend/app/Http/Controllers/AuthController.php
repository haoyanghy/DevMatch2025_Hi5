<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        return response()->json(['user' => $user], 201);
    }

    public function login(Request $request) {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();
        
        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('client-token')->plainTextToken;
        
        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email
            ]
        ]);
    }

    public function updateProfile(Request $request) {
        $user = $request->user();
        
        $rules = [];
        $updateData = [];
        
        // Validate profile image if provided
        if ($request->has('profile_image') && !empty($request->profile_image)) {
            $rules['profile_image'] = 'url';
            $updateData['profile_image'] = $request->profile_image;
        }
        
        // Validate password change if provided
        if ($request->has('current_password') && !empty($request->current_password)) {
            $rules['current_password'] = 'required';
            $rules['new_password'] = 'required|min:6';
            
            // Verify current password
            if (!Hash::check($request->current_password, $user->password)) {
                return response()->json(['message' => 'Current password is incorrect'], 400);
            }
            
            $updateData['password'] = bcrypt($request->new_password);
        }
        
        // Validate the request
        $request->validate($rules);
        
        // Update user data
        if (!empty($updateData)) {
            $user->update($updateData);
        }
        
        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'profile_image' => $user->profile_image
            ]
        ]);
    }

}
