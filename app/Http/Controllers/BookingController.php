<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    public function SubmitBooking(Request $request)
    {
        // 1. Validate booking information
        $validated = $request->validate([
            'class_name' => 'required|string',
            'booking_date' => 'required|date',
            'start_time' => 'required',
            'end_time' => 'required',
            'purpose' => 'required|string',
        ]);

        // 2. Get logged-in user
        $user = $request->user();

        // Default venue
        $venueName = 'Computer Laboratory';

        // 3. Make sure start time is before end time
        if ($validated['start_time'] >= $validated['end_time']) {
            return response()->json([
                'success' => false,
                'message' => 'End time must be later than start time.',
            ], 422);
        }

        // 4. Check for overlapping booking
        $existingBooking = Booking::with('user')
            ->where('venue_name', $venueName)
            ->where('booking_date', $validated['booking_date'])
            ->where('status', '!=', 'rejected')
            ->where('start_time', '<', $validated['end_time'])
            ->where('end_time', '>', $validated['start_time'])
            ->first();

        // 5. Booking conflict
        if ($existingBooking) {

            $teacherName = $existingBooking->user->name ?? 'Another teacher';

            $teacherPhone = $existingBooking->user->phone
                ?? 'Phone number not available';

            return response()->json([
                'success' => false,
                'message' => 'The selected venue is already booked.',

                'booking' => [
                    'teacher_name' => $teacherName,
                    'teacher_phone' => $teacherPhone,
                    'class_name' => $existingBooking->class_name,
                    'venue_name' => $existingBooking->venue_name,
                    'booking_date' => $existingBooking->booking_date,
                    'start_time' => $existingBooking->start_time,
                    'end_time' => $existingBooking->end_time,
                    'purpose' => $existingBooking->purpose,
                ],
            ], 409);
        }

        // 6. No conflict - create booking
        $booking = Booking::create([
            'user_id' => $user->id,
            'class_name' => $validated['class_name'],
            'venue_name' => $venueName,
            'booking_date' => $validated['booking_date'],
            'start_time' => $validated['start_time'],
            'end_time' => $validated['end_time'],
            'purpose' => $validated['purpose'],
            'status' => 'pending',
        ]);

        // 7. Success response
        return response()->json([
            'success' => true,
            'message' => 'Booking submitted successfully.',
            'booking' => $booking,
        ], 201);
    }
}
