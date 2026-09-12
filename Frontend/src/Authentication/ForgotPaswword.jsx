import React from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F7F6F3] px-4">
            <div className="w-full max-w-sm">

                <form className="bg-white rounded-xs p-6 shadow-sm border border-[#EDEBE3]">
                    {/* Email field */}
                    <div className="mb-5">
                        <label htmlFor="email" className="block text-sm font-medium text-[#14213D] mb-1.5">
                            Email
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9C9890]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                    <rect x="2" y="4" width="20" height="16" rx="1" />
                                    <path d="m2 7 10 6 10-6" />
                                </svg>
                            </span>
                            <input
                                id="email"
                                type="email"
                                className="w-full rounded-xs border border-[#DDD9CE] pl-9 pr-3 py-2 text-sm outline-none transition
                                    focus:border-[#0944c2] focus:ring-2 focus:ring-[#0944c2]/15"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    {/* OTP section */}
                    <div className="mb-5">
                        <label className="block text-sm font-medium text-[#14213D] mb-3 text-center">
                            Enter the code (OTP)
                        </label>
                        <div className="flex justify-between gap-2">
                            {[0, 1, 2, 3, 4, 5].map((i) => (
                                <input
                                    key={i}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    className="w-11 h-12 text-center text-lg font-medium rounded-xs border border-[#DDD9CE] outline-none transition
                                        focus:border-[#0944c2] focus:ring-2 focus:ring-[#0944c2]/15"
                                />
                            ))}
                        </div>
                        <button
                            type="button"
                            className="mt-4 w-full text-center text-sm text-[#0944c2] hover:underline"
                        >
                            Didn't receive the code? Resend
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-xs bg-[#0944c2] cursor-pointer text-white text-sm font-medium py-2.5
                            hover:bg-[#063291] transition"
                    >
                        Comfirm
                    </button>
                </form>

            </div>
        </div>
    );
}

export default ForgotPassword;