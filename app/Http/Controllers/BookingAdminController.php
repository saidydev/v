<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class BookingAdminController extends Controller
{
    public function AdminBookings(Request $request)
    {
        $bookingdata = Booking::with('user')->latest()->get();
        return response([
            'bookingdata' => $bookingdata,
        ]);
    }
}
