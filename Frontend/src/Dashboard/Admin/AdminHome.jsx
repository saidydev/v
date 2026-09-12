import React, { useEffect, useState } from 'react';
import SideNav from './components/SideNav.jsx';
import axiosClient from '../../axiosClient.jsx'
import { Link } from 'react-router-dom';


function AdminHome() {

    const [user, setUser] = useState(null)
    const [bookings, setBookings] = useState(0)
    const [accepted, setAccepted] = useState(0);
    const [rejected, setRejected] = useState(0);
    const [pending, setPending] = useState(0);

    const [bookingdata, setBookingdata] = useState([]);

    useEffect(() => {
        axiosClient.get('/admin')
            .then(({ data }) => {
                setUser(data.user);
                setBookings(data.bookings);
                setAccepted(data.accepted);
                setPending(data.pending);
                setRejected(data.rejected);
                setBookingdata(data.bookingdata);

            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const updateBookingStatus = (id, newStatus) => {
        axiosClient.put(`/admin/bookings/${ id }/status`, {
            status: newStatus
        })
            .then(({ data }) => {

                // Update booking kwenye table
                setBookingdata((prev) =>
                    prev.map((booking) =>
                        booking.id === id
                            ? {
                                ...booking,
                                status: data.booking.status
                            }
                            : booking
                    )
                );
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <SideNav />

            <main className="lg:pl-24 lg:peer-hover:pl-56 transition-[padding] duration-300 ease-in-out w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-4">
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
                                Hello, {user?.name} 👋
                            </h1>
                            <p className="mt-1 text-[20px] md:text-base font-medium text-[#5C6370]">
                                Here's what's happening with your venues today.
                            </p>
                        </div>

                        {/* Live Date Badge */}
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex flex-col items-end border-l border-[#EDEBE3] pl-4">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9C9890]">
                                    Today's Date
                                </span>
                                <span className="text-[20px] font-semibold text-[#14213D]">
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
                        <p className="mt-1 text-md font-medium text-[#5C6370]">Total bookings</p>
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
                        <p className="mt-1 text-md font-medium text-[#5C6370]">Accepted</p>
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
                        <p className="mt-1 text-md font-medium text-[#5C6370]">Rejected</p>
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
                        <p className="mt-1 text-md font-medium text-[#5C6370]">Pending</p>
                    </div>
                </div>

                <section className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden font-sans">

                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
                        <div>
                            <h2 className="text-base font-semibold text-slate-900 tracking-tight">
                                Recent Booking Requests
                            </h2>

                            <p className="text-xs text-slate-500 mt-0.5">
                                Manage upcoming schedule requests across all active venues.
                            </p>
                        </div>

                        <Link
                            to="/dashboard/admin/bookings"
                            className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors duration-150 flex items-center gap-1 border border-blue-100"
                        >
                            View All

                            <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </Link>
                    </div>

                    {/* Table Content */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left border-collapse">

                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">

                                    <th className="px-4 py-3">Teacher</th>
                                    <th className="px-4 py-3">Class</th>
                                    <th className="px-4 py-3">Date</th>
                                    <th className="px-4 py-3">Time</th>
                                    <th className="px-4 py-3">Purpose</th>
                                    <th className="px-4 py-3">Booked</th>
                                    <th className="px-4 py-3 text-center">Status</th>

                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100 text-slate-700">

                                {bookingdata.map((data) => (

                                    <tr
                                        key={data.id}
                                        className="hover:bg-slate-50/80 transition-colors duration-150"
                                    >

                                        {/* Teacher */}
                                        <td className="px-4 py-3">
                                            <div className="min-w-36">
                                                <p className="text-xs font-semibold text-slate-900 whitespace-nowrap">
                                                    {data.user?.name || "Unknown"}
                                                </p>
                                                <p className="text-[11px] text-slate-500 mt-0.5">
                                                    {data.user?.check_number || "No check number"}
                                                </p>
                                            </div>
                                        </td>

                                        {/* Class */}
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className="text-xs font-medium text-slate-800">
                                                {data.class_name}
                                            </span>
                                        </td>

                                        {/* Date */}
                                        <td className="px-4 py-3 whitespace-nowrap text-xs text-slate-600">
                                            {data.booking_date}
                                        </td>

                                        {/* Time */}
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className="inline-flex items-center bg-slate-100 px-2.5 py-1 rounded text-xs font-medium text-slate-700 border border-slate-200">
                                                {data.start_time} - {data.end_time}
                                            </span>
                                        </td>

                                        {/* Purpose */}
                                        <td className="px-4 py-3 max-w-xs">
                                            <p
                                                className="text-xs text-slate-600 truncate"
                                                title={data.purpose}
                                            >
                                                {data.purpose || "—"}
                                            </p>
                                        </td>

                                        {/* Booked At */}
                                        <td className="px-4 py-3 whitespace-nowrap text-xs text-slate-500">
                                            {data.created_at
                                                ? new Date(data.created_at).toLocaleString()
                                                : "—"}
                                        </td>

                                        <td className="px-4 py-3 text-center whitespace-nowrap">

                                            {data.status === "pending" ? (

                                                <div className="flex items-center justify-center gap-2">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            updateBookingStatus(data.id, "accepted")
                                                        }
                                                        className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition"
                                                    >
                                                        Accept
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            updateBookingStatus(data.id, "rejected")
                                                        }
                                                        className="px-3 py-1.5 text-xs font-medium text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition"
                                                    >
                                                        Reject
                                                    </button>

                                                </div>

                                            ) : (

                                                <span
                                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs text-xs font-medium border capitalize
                ${ data.status === "accepted"
                                                            ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                                                            : "text-rose-700 bg-rose-50 border-rose-200"
                                                        }`}
                                                >

                                                    <span
                                                        className={`w-1.5 h-1.5 rounded-full
                    ${ data.status === "accepted"
                                                                ? "bg-emerald-500"
                                                                : "bg-rose-500"
                                                            }`}
                                                    />

                                                    {data.status === "accepted"
                                                        ? "Accepted"
                                                        : "Rejected"}

                                                </span>

                                            )}

                                        </td>
                                    </tr>

                                ))}

                            </tbody>

                        </table>
                    </div>

                </section>
            </main>
        </div >
    );
}

export default AdminHome;