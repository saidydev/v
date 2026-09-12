import React, { useState, useEffect } from 'react';
import SideNav from './components/SideNav.jsx';
import axiosClient from '../axiosClient.jsx'



function Home() {

    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState(0);
    const [accepted, setAccepted] = useState(0);
    const [rejected, setRejected] = useState(0);
    const [pending, setPending] = useState(0);

    const [bookingsData, setbookingsData] = useState([]);


    useEffect(() => {
        axiosClient.get('/dashboard')
            .then(({ data }) => {
                setUser(data.user);
                setBookings(data.bookings);
                setAccepted(data.accepted);
                setRejected(data.rejected);
                setPending(data.pending);
                setbookingsData(data.bookingsData);

            })
            .catch((error) => {
                console.log(error)
            });
    }, [])
    return (
        <div className="min-h-screen bg-[#F7F6F3]">
            <SideNav />
            <main className="lg:pl-24 lg:peer-hover:pl-56 transition-[padding] duration-300 ease-in-out w-full px-2 sm:px-6 lg:px-8 py-3 lg:py-3 flex flex-col gap-4">
                <div className="group relative bg-white/80 backdrop-blur-md rounded-xs border border-[#EDEBE3] p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:shadow-lg  transition-all duration-300 ease-out overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-bold tracking-wider text-blue-700 uppercase bg-blue-50/80 px-2 py-0.5 rounded-xs border border-blue-200/60">
                                    Dashboard Overview
                                </span>
                            </div>
                            <h1 className="font-serif text-2xl lg:text-3xl font-bold text-[#14213D] tracking-tight group-hover:text-blue-950 transition-colors duration-200">
                                Hello <span className="text-blue-700">{user?.name} </span>
                            </h1>
                            <p className="mt-1 text-sm md:text-base font-medium text-[#5C6370]">
                                Here's what's happening with your venues today.
                            </p>
                        </div>

                        {/* Live Date Badge */}
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex flex-col items-end border-l border-[#EDEBE3] pl-4">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9C9890]">
                                    Today's Date
                                </span>
                                <span className="text-sm font-semibold text-[#14213D]">
                                    {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                    {/* Card 1: Total Bookings */}
                    <div className="group relative bg-white/80 backdrop-blur-md rounded-xs border border-[#EDEBE3] hover:border-blue-500/50 p-5 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden">
                        {/* Subtle accent bar at top */}
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-xs bg-blue-50/80 border border-blue-100/80 text-blue-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="1" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                            </div>
                            <span className="text-[10px] font-bold tracking-wider text-blue-700 uppercase bg-blue-50/80 px-2 py-0.5 rounded-xs border border-blue-200/60">
                                Total
                            </span>
                        </div>

                        <div className="flex items-baseline justify-between">
                            <p className="text-2xl lg:text-3xl font-semibold text-[#14213D] tracking-tight group-hover:text-blue-600 transition-colors duration-200">{bookings}</p>
                        </div>
                        <p className="mt-1 text-xs font-medium text-[#5C6370]">Total bookings</p>
                    </div>

                    {/* Card 2: Accepted */}
                    <div className="group relative bg-white/80 backdrop-blur-md rounded-xs border border-[#EDEBE3] hover:border-emerald-500/50 p-5 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-xs bg-emerald-50/80 border border-emerald-100/80 text-emerald-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            <span className="text-[10px] font-bold tracking-wider text-emerald-700 uppercase bg-emerald-50/80 px-2 py-0.5 rounded-xs border border-emerald-200/60">
                                Active
                            </span>
                        </div>

                        <div className="flex items-baseline justify-between">
                            <p className="text-2xl lg:text-3xl font-semibold text-[#14213D] tracking-tight group-hover:text-emerald-600 transition-colors duration-200">{accepted}</p>
                        </div>
                        <p className="mt-1 text-xs font-medium text-[#5C6370]">Accepted</p>
                    </div>

                    {/* Card 3: Rejected */}
                    <div className="group relative bg-white/80 backdrop-blur-md rounded-xs border border-[#EDEBE3] hover:border-rose-500/50 p-5 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:shadow-lg hover:shadow-rose-500/5 hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-xs bg-rose-50/80 border border-rose-100/80 text-rose-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-rose-600 group-hover:text-white transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </div>
                            <span className="text-[10px] font-bold tracking-wider text-rose-700 uppercase bg-rose-50/80 px-2 py-0.5 rounded-xs border border-rose-200/60">
                                Declined
                            </span>
                        </div>

                        <div className="flex items-baseline justify-between">
                            <p className="text-2xl lg:text-3xl font-semibold text-[#14213D] tracking-tight group-hover:text-rose-600 transition-colors duration-200">{rejected}</p>
                        </div>
                        <p className="mt-1 text-xs font-medium text-[#5C6370]">Rejected</p>
                    </div>

                    {/* Card 4: Pending */}
                    <div className="group relative bg-white/80 backdrop-blur-md rounded-xs border border-[#EDEBE3] hover:border-amber-500/50 p-5 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:shadow-lg hover:shadow-amber-500/5 hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-xs bg-amber-50/80 border border-amber-100/80 text-amber-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                            </div>
                            <span className="text-[10px] font-bold tracking-wider text-amber-700 uppercase bg-amber-50/80 px-2 py-0.5 rounded-xs border border-amber-200/60">
                                Action
                            </span>
                        </div>

                        <div className="flex items-baseline justify-between">
                            <p className="text-2xl lg:text-3xl font-semibold text-[#14213D] tracking-tight group-hover:text-amber-600 transition-colors duration-200">{pending}</p>
                        </div>
                        <p className="mt-1 text-xs font-medium text-[#5C6370]">Pending</p>
                    </div>
                </div>

                <div className="group relative bg-white/90 backdrop-blur-md rounded-xs border border-slate-200/80 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.12)]">

                    {/* Table Header */}
                    <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200/80 bg-linear-to-r from-slate-50/80 to-white">

                        <div className="flex items-center gap-3">

                            <div className="flex items-center justify-center w-9 h-9 rounded-xs bg-blue-50 border border-blue-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="17"
                                    height="17"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-blue-600"
                                >
                                    <rect x="3" y="4" width="18" height="18" rx="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                            </div>

                            <div>
                                <h2 className="text-base font-bold text-slate-800 tracking-tight">
                                    Recent Bookings
                                </h2>

                                <p className="text-xs text-slate-500 mt-0.5">
                                    Your latest venue booking requests
                                </p>
                            </div>

                        </div>

                        {/* Booking Count */}
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xs bg-slate-100 border border-slate-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>

                            <span className="text-xs font-semibold text-slate-600">
                                {bookingsData.length} {bookingsData.length === 1 ? 'Booking' : 'Bookings'}
                            </span>
                        </div>

                    </div>


                    {/* Table */}
                    <div className="overflow-x-auto">

                        <table className="w-full text-sm text-left">

                            {/* Table Head */}
                            <thead>
                                <tr className="bg-slate-50/70 border-b border-slate-200">

                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                        Venue
                                    </th>

                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                        Class
                                    </th>

                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                        Date
                                    </th>

                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                        Time Slot
                                    </th>

                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                        Purpose
                                    </th>

                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 text-right">
                                        Status
                                    </th>

                                </tr>
                            </thead>


                            {/* Table Body */}
                            <tbody className="divide-y divide-slate-100">

                                {bookingsData.length > 0 ? (

                                    bookingsData.map((booking, index) => {

                                        /* Status condition */
                                        const status = booking.status?.toLowerCase();

                                        let statusStyle = {
                                            badge: "bg-slate-100 text-slate-600 border-slate-200",
                                            dot: "bg-slate-400",
                                            icon: "•"
                                        };

                                        if (status === "pending") {
                                            statusStyle = {
                                                badge: "bg-amber-50 text-amber-700 border-amber-200",
                                                dot: "bg-amber-500",
                                                icon: "◷"
                                            };
                                        }

                                        if (status === "accepted") {
                                            statusStyle = {
                                                badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
                                                dot: "bg-emerald-500",
                                                icon: "✓"
                                            };
                                        }

                                        if (status === "rejected") {
                                            statusStyle = {
                                                badge: "bg-rose-50 text-rose-700 border-rose-200",
                                                dot: "bg-rose-500",
                                                icon: "×"
                                            };
                                        }

                                        return (
                                            <tr
                                                key={booking.id}
                                                className="
                                    group/row
                                    bg-white
                                    hover:bg-blue-50/30
                                    transition-all
                                    duration-300
                                    ease-out
                                    animate-[fadeIn_0.4s_ease-out_both]
                                "
                                                style={{
                                                    animationDelay: `${ index * 70 }ms`
                                                }}
                                            >

                                                {/* Venue */}
                                                <td className="px-6 py-4">

                                                    <div className="flex items-center gap-3">

                                                        <div className="w-9 h-9 rounded-xs bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 group-hover/row:bg-blue-100 group-hover/row:scale-105 transition-all duration-300">

                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                className="text-blue-600"
                                                            >
                                                                <path d="M3 21h18" />
                                                                <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
                                                                <path d="M9 8h1" />
                                                                <path d="M14 8h1" />
                                                                <path d="M9 12h1" />
                                                                <path d="M14 12h1" />
                                                                <path d="M9 16h1" />
                                                                <path d="M14 16h1" />
                                                            </svg>

                                                        </div>

                                                        <span className="font-semibold text-slate-800 whitespace-nowrap group-hover/row:text-blue-700 transition-colors duration-200">
                                                            {booking.venue_name}
                                                        </span>

                                                    </div>

                                                </td>


                                                {/* Class */}
                                                <td className="px-6 py-4">

                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-xs bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 whitespace-nowrap">
                                                        {booking.class_name}
                                                    </span>

                                                </td>


                                                {/* Date */}
                                                <td className="px-6 py-4 whitespace-nowrap">

                                                    <div className="flex flex-col">

                                                        <span className="text-sm font-medium text-slate-700">
                                                            {booking.booking_date}
                                                        </span>

                                                    </div>

                                                </td>


                                                {/* Time */}
                                                <td className="px-6 py-4 whitespace-nowrap">

                                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xs bg-slate-50 border border-slate-200">

                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="14"
                                                            height="14"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="text-slate-400"
                                                        >
                                                            <circle cx="12" cy="12" r="9" />
                                                            <polyline points="12 7 12 12 15 14" />
                                                        </svg>

                                                        <span className="text-xs font-mono font-semibold text-slate-600">
                                                            {booking.start_time} - {booking.end_time}
                                                        </span>

                                                    </div>

                                                </td>


                                                {/* Purpose */}
                                                <td className="px-6 py-4">

                                                    <p className="max-w-55 truncate text-sm text-slate-600">
                                                        {booking.purpose}
                                                    </p>

                                                </td>


                                                {/* Status */}
                                                <td className="px-6 py-4 text-right">

                                                    <span
                                                        className={`
                                            inline-flex
                                            items-center
                                            gap-2
                                            px-3
                                            py-1.5
                                            rounded-full
                                            border
                                            text-[10px]
                                            font-bold
                                            uppercase
                                            tracking-wider
                                            transition-all
                                            duration-300
                                            group-hover/row:scale-105
                                            ${ statusStyle.badge }
                                        `}
                                                    >

                                                        <span className="text-sm leading-none">
                                                            {statusStyle.icon}
                                                        </span>

                                                        <span
                                                            className={`w-1.5 h-1.5 rounded-full ${ statusStyle.dot }`}
                                                        />

                                                        {booking.status}

                                                    </span>

                                                </td>

                                            </tr>
                                        );
                                    })

                                ) : (

                                    /* Empty State */
                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="px-6 py-14 text-center"
                                        >

                                            <div className="flex flex-col items-center justify-center">

                                                <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-4">

                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="1.7"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="text-slate-400"
                                                    >
                                                        <rect x="3" y="4" width="18" height="18" rx="2" />
                                                        <line x1="16" y1="2" x2="16" y2="6" />
                                                        <line x1="8" y1="2" x2="8" y2="6" />
                                                        <line x1="3" y1="10" x2="21" y2="10" />
                                                    </svg>

                                                </div>

                                                <h3 className="text-sm font-semibold text-slate-700">
                                                    No bookings yet
                                                </h3>

                                                <p className="text-xs text-slate-400 mt-1">
                                                    Your venue booking requests will appear here.
                                                </p>

                                            </div>

                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </main>
        </div>
    );
}

export default Home;