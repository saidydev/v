<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function Home(request $request){
        $user = $request->user();
        $bookings = $user->bookings()->count();
        $accepted = $user->bookings()->where('status', 'accepted')->count();
        $rejected = $user->bookings()->where('status', 'rejected')->count();
        $pending = $user->bookings()->where('status', 'pending')->count();
        $bookingsData = $user->bookings()->get();

        return response ([
            'user' => $user,
            'bookings' => $bookings,
            'accepted' => $accepted,
            'rejected' => $rejected,
            'pending' => $pending,
            'bookingsData' => $bookingsData
        ]);
    }

}
