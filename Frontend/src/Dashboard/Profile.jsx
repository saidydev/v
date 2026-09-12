import React, { useEffect, useState, useRef } from 'react';
import SideNav from './components/SideNav.jsx';
import axiosClient from '../axiosClient.jsx'


function Profile() {
    const [user, setUser] = useState(null);
    const emailRef = useRef();
    const phoneRef = useRef();

    const currentPasswordRef = useRef();
    const newPasswordRef = useRef();
    const confirmPasswordRef = useRef();

    const [success, setSuccess] = useState('');
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState('');

    useEffect(() => {
        axiosClient.get('/profile')
            .then(({ data }) => {
                setUser(data.user);
            })
    }, [])

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        const payload = {
            email: emailRef.current.value,
            phone: phoneRef.current.value,
        };

        axiosClient.put('/profile-update', payload)
            .then(({ data }) => {
                setSuccess("Contacts Updated successifully !!");

                emailRef.current.value = '';
                phoneRef.current.value = '';
            })
            .catch((err) => {
                const response = err.response;
                if (response) {
                    if (response.status === 422) {
                        setErrors(response.data.errors);
                    } else {
                        // Server Errors (Status Code 500 n.k.)
                        setGeneralError(response.data.message || 'Server error occurred. Please try again.');
                    }
                } else {
                    // Network Error
                    setGeneralError('Network error. Please check your connection.');
                }
            });
    }

    const PasswordUpdate = (e) => {
        e.preventDefault();
        const payload = {
            current_password: currentPasswordRef.current.value,
            new_password: newPasswordRef.current.value,
            new_password_confirmation: confirmPasswordRef.current.value,
        };

        axiosClient.put('/password-update', payload)
            .then(({ data }) => {
                setSuccess("Password Updated successifully !!");

                currentPasswordRef.current.value = '';
                newPasswordRef.current.value = '';
                confirmPasswordRef.current.value = '';
            })
            .catch((err) => {
                const response = err.response;
                if (response) {
                    if (response.status === 422) {
                        setErrors(response.data.errors);
                    } else {
                        // Server Errors (Status Code 500 n.k.)
                        setGeneralError(response.data.message || 'Server error occurred. Please try again.');
                    }
                } else {
                    // Network Error
                    setGeneralError('Network error. Please check your connection.');
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
                                <span className='h-2 w-2 rounded-full bg-emerald-400 animate-pulse' /> Profile Management
                            </span>
                            <p className='text-emerald-100/80 text-md md:text-base font-normal'>
                                Manage your profile information.
                            </p>
                        </div>
                    </div>
                </div>
                <div className=''>
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
                </div>

                <div className="w-full flex flex-col lg:flex-row gap-4">

                    <form className="group relative bg-white/90 backdrop-blur-md rounded-xs border border-[#EDEBE3] shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-300 w-full lg:w-1/2" onSubmit={handleUpdateProfile}>

                        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EDEBE3] bg-slate-50/60">

                            <div className="flex items-center gap-3">

                                <div className="flex items-center justify-center w-8 h-8 rounded-xs bg-blue-50 text-blue-600">
                                    <i className="fa-solid fa-user text-sm"></i>
                                </div>

                                <div>
                                    <h2 className="font-serif text-base font-bold text-[#14213D] tracking-tight">
                                        Personal Information
                                    </h2>

                                    <p className="text-[11px] text-[#9C9890] mt-0.5">
                                        Manage your account details
                                    </p>
                                </div>

                            </div>

                        </div>

                        <div className="p-6 space-y-5">

                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9C9890] mb-1.5">
                                    Full Name
                                </label>

                                <div className="relative">
                                    <input
                                        type="text"
                                        value={user?.name || ''}
                                        readOnly
                                        className="w-full rounded-xs border border-[#E5E2DA] bg-[#F8F8F6] px-3 py-2.5 pr-10 text-sm font-medium text-[#14213D] outline-none cursor-not-allowed"
                                    />

                                    <i className="fa-solid fa-lock absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-[#9C9890]"></i>
                                </div>

                                <p className="text-[10px] text-[#9C9890] mt-1">
                                    Your name is managed by the system administrator.
                                </p>
                            </div>


                            {/* Check Number */}
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#9C9890] mb-1.5">
                                    Check Number
                                </label>

                                <div className="relative">
                                    <input
                                        type="text"
                                        value={user?.check_number || ''}
                                        readOnly
                                        className="w-full rounded-xs border border-[#E5E2DA] bg-[#F8F8F6] px-3 py-2.5 pr-10 text-sm font-medium text-[#14213D] outline-none cursor-not-allowed"
                                    />

                                    <i className="fa-solid fa-lock absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-[#9C9890]"></i>
                                </div>
                            </div>


                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-[10px] font-bold uppercase tracking-wider text-[#9C9890] mb-1.5"
                                >
                                    Email Address
                                </label>

                                <div className="relative">
                                    <i className="fa-solid fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#9C9890]"></i>

                                    <input
                                        id="email"
                                        type="email"
                                        ref={emailRef}
                                        placeholder={user?.email}
                                        className="w-full rounded-xs border border-[#DDD9CE] bg-white pl-9 pr-3 py-2.5 text-sm text-[#14213D] outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                                    />
                                </div>
                            </div>


                            {/* Phone */}
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-[10px] font-bold uppercase tracking-wider text-[#9C9890] mb-1.5"
                                >
                                    Phone Number
                                </label>

                                <div className="relative">
                                    <i className="fa-solid fa-phone absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#9C9890]"></i>

                                    <input
                                        id="phone"

                                        ref={phoneRef}
                                        type="text"
                                        className="w-full rounded-xs border border-[#DDD9CE] bg-white pl-9 pr-3 py-2.5 text-sm text-[#14213D] outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                                        placeholder={user?.phone}
                                    />
                                </div>
                            </div>


                            {/* Save Changes */}

                            <button
                                className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-white bg-[#0944c2] hover:bg-[#063291] px-4 py-2.5 rounded-xs transition-all duration-200"
                            >
                                <i className="fa-solid fa-check"></i>
                                Save Changes
                            </button>


                        </div>
                    </form>


                    {/* Account Security */}
                    <div className="group relative bg-white/90 backdrop-blur-md rounded-xs border border-[#EDEBE3] shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-300 w-full lg:w-1/2">

                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EDEBE3] bg-slate-50/60">

                            <div className="flex items-center gap-3">

                                <div className="flex items-center justify-center w-8 h-8 rounded-xs bg-amber-50 text-amber-600">
                                    <i className="fa-solid fa-shield-halved text-sm"></i>
                                </div>

                                <div>
                                    <h2 className="font-serif text-base font-bold text-[#14213D] tracking-tight">
                                        Account Security
                                    </h2>

                                    <p className="text-[11px] text-[#9C9890] mt-0.5">
                                        Keep your account secure
                                    </p>
                                </div>

                            </div>

                        </div>


                        {/* Security content */}
                        <div className="p-6">

                            <form className="space-y-5" onSubmit={PasswordUpdate}>

                                {/* Current Password */}
                                <div>
                                    <label
                                        htmlFor="current-password"
                                        className="block text-[10px] font-bold uppercase tracking-wider text-[#9C9890] mb-1.5"
                                    >
                                        Current Password
                                    </label>

                                    <div className="relative">

                                        <i className="fa-solid fa-key absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#9C9890]"></i>

                                        <input
                                            id="current-password"
                                            ref={currentPasswordRef}
                                            type="password"
                                            className="w-full rounded-xs border border-[#DDD9CE] bg-white pl-9 pr-3 py-2.5 text-sm text-[#14213D] outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                                            placeholder="Enter current password"
                                        />

                                    </div>
                                </div>


                                {/* New Password */}
                                <div>
                                    <label
                                        htmlFor="new-password"
                                        className="block text-[10px] font-bold uppercase tracking-wider text-[#9C9890] mb-1.5"
                                    >
                                        New Password
                                    </label>

                                    <div className="relative">

                                        <i className="fa-solid fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#9C9890]"></i>

                                        <input
                                            id="new-password"
                                            ref={newPasswordRef}
                                            type="password"
                                            className="w-full rounded-xs border border-[#DDD9CE] bg-white pl-9 pr-3 py-2.5 text-sm text-[#14213D] outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                                            placeholder="Enter new password"
                                        />

                                    </div>

                                    <p className="text-[10px] text-[#9C9890] mt-1">
                                        Use at least 8 characters.
                                    </p>
                                </div>


                                {/* Confirm Password */}
                                <div>
                                    <label
                                        htmlFor="confirm-password"
                                        className="block text-[10px] font-bold uppercase tracking-wider text-[#9C9890] mb-1.5"
                                    >
                                        Confirm New Password
                                    </label>

                                    <div className="relative">

                                        <i className="fa-solid fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#9C9890]"></i>

                                        <input
                                            id="confirm-password"
                                            ref={confirmPasswordRef}
                                            type="password"
                                            className="w-full rounded-xs border border-[#DDD9CE] bg-white pl-9 pr-3 py-2.5 text-sm text-[#14213D] outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                                            placeholder="Confirm new password"
                                        />

                                    </div>
                                </div>


                                {/* Security Notice */}
                                <div className="flex gap-3 rounded-xs border border-blue-100 bg-blue-50/60 p-3">

                                    <i className="fa-solid fa-circle-info text-blue-600 text-sm mt-0.5"></i>

                                    <p className="text-[11px] leading-relaxed text-blue-800">
                                        Changing your password will help keep your account secure.
                                        Make sure you remember your new password.
                                    </p>

                                </div>


                                {/* Update Button */}
                                <div className="pt-1">

                                    <button
                                        type="submit"
                                        className="w-full inline-flex items-center justify-center gap-2 cursor-pointer text-xs font-semibold text-white bg-[#0944c2] hover:bg-[#063291] px-4 py-2.5 rounded-xs transition-all duration-200"
                                    >
                                        <i className="fa-solid fa-shield-check"></i>
                                        Update Password
                                    </button>

                                </div>

                            </form>

                        </div>
                    </div>

                </div>

            </main>
        </div>
    );
}

export default Profile;