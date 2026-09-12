import React, { useRef, useState } from 'react';
import SideNav from './components/SideNav.jsx';
import axiosClient from '../axiosClient';
import { Link } from 'react-router-dom';
// import { useStateContext } from '../Contexts/ContextProvider.jsx';

function Bookings() {
    const [errors, setErrors] = useState(null);
    const [generalError, setGeneralError] = useState('');
    const [success, setSuccess] = useState('');
    const [bookingConflict, setBookingConflict] = useState(null);

    const class_nameRef = useRef();
    const booking_dateRef = useRef();
    const start_timeRef = useRef();
    const end_timeRef = useRef();
    const purposeRef = useRef();


    const SubmitForm = (e) => {
        e.preventDefault();
        const payload = {
            class_name: class_nameRef.current.value,
            booking_date: booking_dateRef.current.value,
            start_time: start_timeRef.current.value,
            end_time: end_timeRef.current.value,
            purpose: purposeRef.current.value,
        };
        axiosClient.post('/booking', payload)
            .then(({ data }) => {
                setSuccess("Booking created");

                class_nameRef.current.value = '';
                booking_dateRef.current.value = '';
                start_timeRef.current.value = '';
                end_timeRef.current.value = '';
                purposeRef.current.value = '';
            })
            .catch((err) => {

                const response = err.response;

                if (response) {

                    if (response.status === 422) {

                        setErrors(response.data.errors || {});

                    }

                    else if (response.status === 409) {

                        // Get the existing booking information
                        setBookingConflict(response.data.booking);

                    }

                    else {

                        setGeneralError(
                            response.data.message ||
                            'Server error occurred. Please try again.'
                        );

                    }

                } else {

                    setGeneralError(
                        'Network error. Please check your connection.'
                    );

                }
            });
    }
    return (
        <div className="min-h-screen bg-[#F7F6F3]">
            <SideNav />
            <main className="lg:pl-24 lg:peer-hover:pl-56 transition-[padding] duration-300 ease-in-out w-full px-2 sm:px-6 lg:px-8 py-3 lg:py-3 flex flex-col gap-4">
                <div className='relative overflow-hidden rounded-xs bg-linear-to-r from-[#0944c2] to-[#141849] p-6 md:p-8 text-white shadow-xl shadow-[#1d6363]/10'>
                    <div className='absolute -right-10 -bottom-10 h-44 w-44 rounded-full bg-white/10 blur-2xl pointer-events-none' />

                    <div className='relative z-10 flex items-center justify-between gap-4'>
                        <div className='flex flex-col gap-1.5'>
                            <span className='inline-flex max-w-max items-center gap-2 rounded-xs bg-white/15 px-3 py-1 text-xs font-medium tracking-wide backdrop-blur-md text-emerald-100'>
                                <span className='h-2 w-2 rounded-full bg-emerald-400 animate-pulse' /> Bookings
                            </span>
                            <p className='text-emerald-100/80 text-md md:text-base font-normal'>
                                Manage your bookings.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Venue Booking Request Form */}
                <div className="lg:col-span-2 group relative bg-white/80 backdrop-blur-md rounded-xs border border-[#EDEBE3] shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-300">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-[#EDEBE3] bg-slate-50/50">
                        <div className="flex items-center gap-2.5">
                            <div className="w-2 h-2 rounded-xs bg-blue-600" />
                            <h2 className="font-serif text-base font-bold text-[#14213D] tracking-tight">
                                Request a Venue
                            </h2>
                        </div>
                        <Link to={"/bookings"} className="text-[10px] font-bold tracking-wider text-white uppercase bg-blue-800 px-2 py-2 rounded-xs border border-blue-200/60">
                            view Bookings
                        </Link>
                    </div>
                    {bookingConflict && (
                        <div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/70 backdrop-blur-sm p-4 sm:p-6"
                            role="dialog"
                            aria-modal="true"
                        >
                            {/* Modal container */}
                            <div className="flex h-full max-h-[85vh] w-full max-w-5xl flex-col overflow-hidden rounded-sm bg-white shadow-2xl ring-1 ring-black/5">

                                {/* Header */}
                                <div className="flex shrink-0 items-center justify-between border-b border-zinc-100 px-8 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600 ring-4 ring-red-50/60">
                                            <svg
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.75"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                                />
                                            </svg>
                                        </div>

                                        <div>
                                            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
                                                Venue already booked
                                            </h2>
                                            <p className="text-sm text-zinc-500">
                                                Booking conflict detected
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setBookingConflict(null)}
                                        className="flex h-9 w-9 items-center justify-center rounded-full text-2xl text-blue-900 font-bold cursor-pointer transition hover:bg-red-900 hover:text-white"
                                        aria-label="Close"
                                    >
                                        &times;
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="flex flex-1 flex-col justify-between px-8 py-6">

                                    <div>
                                        <p className="text-base leading-6 text-zinc-600">
                                            Samahani, <strong className="font-medium text-zinc-900">muda na tarehe uliyochagua vimeshachukuliwa</strong> na mwalimu mwingine.
                                            Tafadhali angalia taarifa za booking iliyopo hapa chini.
                                        </p>

                                        <div className="mt-5 rounded-2xl border border-zinc-100 bg-zinc-50/60 p-5">
                                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                                                {[
                                                    { label: 'Teacher', value: bookingConflict.teacher_name },
                                                    { label: 'Phone number', value: bookingConflict.teacher_phone },
                                                    { label: 'Class', value: bookingConflict.class_name },
                                                ].map(({ label, value }) => (
                                                    <div key={label}>
                                                        <p className="text-xs font-medium text-zinc-400">{label}</p>
                                                        <p className="mt-1 text-sm font-semibold text-zinc-900">{value}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Contact notice */}
                                        <div className="mt-5 rounded-xs border border-amber-100 bg-amber-50 p-4">
                                            <p className="text-sm text-amber-900">
                                                Tafadhali wasiliana na <strong className="font-medium">{bookingConflict.teacher_name}</strong> kwa taarifa zaidi kuhusu matumizi ya venue katika muda huo.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <form className="p-6 space-y-5" onSubmit={SubmitForm}>
                        {/* Success Alert */}
                        {success && (
                            <div className="p-3 mb-2 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xs">
                                {success}
                            </div>
                        )}

                        {/* General/Server Error Alert */}
                        {generalError && (
                            <div className="p-3 mb-2 text-xs font-medium text-rose-800 bg-rose-50 border border-rose-200 rounded-xs">
                                {generalError}
                            </div>
                        )}
                        {/* Venue (locked/context field) */}
                        <div className='flex lg:flex-row flex-col items-center gap-4 w-full'>
                            <div className="flex flex-col gap-1.5 w-full">
                                <label className="text-sm font-medium text-[#14213D]">
                                    Venue
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9C9890]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                            <path d="m3 9 9-7 9 7" />
                                            <path d="M9 22V12h6v10" />
                                            <path d="M21 22H3" />
                                        </svg>
                                    </span>
                                    <select
                                        defaultValue="computer-lab"
                                        disabled
                                        className="w-full pl-9 pr-3.5 py-2 text-sm font-medium text-[#14213D] bg-slate-50 border border-[#DDD9CE] rounded-xs cursor-not-allowed appearance-none"
                                    >
                                        <option value="computer-lab">Computer Laboratory</option>
                                    </select>
                                    {/* Hidden input keeps the value in the form submission */}
                                    <input type="hidden" name="venue" value="computer-lab" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5 w-full">
                                <label className="text-sm font-medium text-[#14213D]">
                                    Class
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9C9890]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                            <path d="m3 9 9-7 9 7" />
                                            <path d="M9 22V12h6v10" />
                                            <path d="M21 22H3" />
                                        </svg>
                                    </span>
                                    <input type='text' required ref={class_nameRef}
                                        className="w-full pl-9 pr-3 py-2 text-sm font-medium text-[#14213D] bg-white border border-[#DDD9CE] rounded-xs outline-none transition
                        focus:border-[#0944c2] focus:ring-2 focus:ring-[#0944c2]/15"/>
                                </div>
                            </div>
                        </div>

                        {/* Date & time slot */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 border-t border-[#EDEBE3]">
                            <div className="flex flex-col gap-1.5 pt-4">
                                <label className="text-sm font-medium text-[#14213D]">
                                    Date
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9C9890]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                            <rect x="3" y="4" width="18" height="18" rx="1" />
                                            <path d="M16 2v4M8 2v4M3 10h18" />
                                        </svg>
                                    </span>
                                    <input
                                        type="date"
                                        ref={booking_dateRef}
                                        required
                                        className="w-full pl-9 pr-3 py-2 text-sm font-medium text-[#14213D] bg-white border border-[#DDD9CE] rounded-xs outline-none transition
                        focus:border-[#0944c2] focus:ring-2 focus:ring-[#0944c2]/15"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5 pt-4">
                                <label className="text-sm font-medium text-[#14213D]">
                                    From
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9C9890]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                            <circle cx="12" cy="12" r="9" />
                                            <path d="M12 7v5l3 3" />
                                        </svg>
                                    </span>
                                    <input
                                        type="time"
                                        ref={start_timeRef}
                                        required
                                        className="w-full pl-9 pr-3 py-2 text-sm font-medium text-[#14213D] bg-white border border-[#DDD9CE] rounded-xs outline-none transition font-mono
                        focus:border-[#0944c2] focus:ring-2 focus:ring-[#0944c2]/15"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5 pt-4">
                                <label className="text-sm font-medium text-[#14213D]">
                                    To
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9C9890]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                            <circle cx="12" cy="12" r="9" />
                                            <path d="M12 7v5l3 3" />
                                        </svg>
                                    </span>
                                    <input
                                        type="time"
                                        ref={end_timeRef}
                                        required
                                        className="w-full pl-9 pr-3 py-2 text-sm font-medium text-[#14213D] bg-white border border-[#DDD9CE] rounded-xs outline-none transition font-mono
                        focus:border-[#0944c2] focus:ring-2 focus:ring-[#0944c2]/15"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Purpose */}
                        <div className="flex flex-col gap-1.5 pt-4 border-t border-[#EDEBE3]">
                            <label className="text-sm font-medium text-[#14213D]">
                                Purpose / event type
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9C9890]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                        <path d="M4 6h16M4 12h10M4 18h7" />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    ref={purposeRef}
                                    placeholder="e.g. Corporate workshop, wedding reception"
                                    required
                                    className="w-full pl-9 pr-3 py-2 text-sm font-medium text-[#14213D] bg-white border border-[#DDD9CE] rounded-xs outline-none transition
                    focus:border-[#0944c2] focus:ring-2 focus:ring-[#0944c2]/15"
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#EDEBE3]">
                            <button
                                type="button"
                                className="text-sm font-medium text-[#5C6370] hover:text-[#14213D] bg-slate-50 hover:bg-slate-100 px-4 py-2 rounded-xs border border-[#DDD9CE] transition-all duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="text-sm font-medium text-white bg-[#0944c2] hover:bg-[#063291] px-5 py-2 rounded-xs transition-all duration-200"
                            >
                                Submit booking request
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default Bookings;