import React, { useEffect, useState } from 'react';
import SideNav from './components/SideNav.jsx';
import { Link } from 'react-router-dom';
import axiosClient from '../../axiosClient.jsx';

function AdminBookings() {

    const [bookingdata, setBookingdata] = useState([]);
    useEffect(()=>{
        axiosClient.get('/admin')
        .then(({data})=>{
            setBookingdata(data.bookingdata);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])
    return (
        <div className="min-h-screen bg-[#F7F6F3]">
            <SideNav />
            <main className="lg:pl-24 lg:peer-hover:pl-56 transition-[padding] duration-300 ease-in-out w-full px-2 sm:px-6 lg:px-8 py-3 lg:py-3 flex flex-col gap-4">

                {/* Admin Header Banner */}
                <div className="relative overflow-hidden rounded-xs bg-linear-to-r from-[#0944c2] to-[#141849] p-6 md:p-8 text-white shadow-xl shadow-[#1d6363]/10">
                    <div className="absolute -right-10 -bottom-10 h-44 w-44 rounded-full bg-white/10 blur-2xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex flex-col gap-1.5">
                            <span className="inline-flex max-w-max items-center gap-2 rounded-xs bg-white/15 px-3 py-1 text-xs font-medium tracking-wide backdrop-blur-md text-emerald-100">
                                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Admin Panel
                            </span>
                            <h1 className="text-xl md:text-2xl font-serif font-bold text-white">
                                All Venue Bookings
                            </h1>
                            <p className="text-emerald-100/80 text-sm font-normal">
                                Review and perform actions on venue booking requests across all classes.
                            </p>
                        </div>
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
        </div>
    );
}

export default AdminBookings;