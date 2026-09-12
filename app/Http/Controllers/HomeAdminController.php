<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class HomeAdminController extends Controller
{
    public function Admin(Request $request)
    {
        $user = $request->user();
        $bookings = Booking::count();
        $bookingdata = Booking::with('user')->latest()->limit(5)->get();
        $accepted = Booking::where('status', 'accepted')->count();
        $rejected = Booking::where('status', 'rejected')->count();
        $pending = Booking::where('status', 'pending')->count();
        return response([
            'user' => $user,
            'bookings' => $bookings,
            'bookingdata' => $bookingdata,
            'accepted' => $accepted,
            'rejected' => $rejected,
            'pending' => $pending,
        ]);
    }

    public function updateStatus(Request $request, int $id)
    {
        $booking = Booking::findOrFail($id);

        $request->validate([
            'status' => 'required|in:accepted,rejected,pending',
        ]);

        $booking->update([
            'status' => $request->status,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Booking status updated successfully.',
            'booking' => $booking,
        ]);
    }
}
