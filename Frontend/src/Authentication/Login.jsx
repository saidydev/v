import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../Contexts/ContextProvider';
import axiosClient from '../axiosClient';

function Login() {
    const { setUser, setToken } = useStateContext();
    const navigate = useNavigate();
    const check_numberref = useRef();
    const passwordRef = useRef();

    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);

    const SubmitForm = (e) => {
        e.preventDefault();
        setErrors(null);
        setLoading(true);

        const payload = {
            check_number: check_numberref.current.value,
            password: passwordRef.current.value,
        };

        axiosClient.post('/login', payload)
        .then(({ data }) => {
            setUser(data.user);
            setToken(data.token);

            const role = (data.user.role || '').toLowerCase();
            if (role === 'teacher') {
                navigate('/dashboard/home');
            } else if (role === 'admin') {
                navigate('/dashboard/admin/home');
            } else {
                navigate('/');
            }
        })
        .catch((err) => {
            const response = err.response;
            if (response && response.status === 422) {
                setErrors(response.data.errors);
            } else if (response && response.status === 401) {
                setErrors({ general: [response.data.message] });
            } else {
                setErrors({ general: ["Network error or server unavailable."] });
            }
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F7F6F3] px-4">
            <div className="w-full max-w-sm">

                <form className="bg-white rounded-xs flex flex-col gap-4 p-6 shadow-sm border border-[#EDEBE3]" onSubmit={SubmitForm}>
                    <div className="flex flex-col gap-2">
                        <h1 className="mt-2 text-xl font-medium">Sign in</h1>
                        <hr className="border-none bg-[#0944c2] h-1 w-7" />
                    </div>

                    {/* Display General Error Message */}
                    {errors && errors.general && (
                        <div className="bg-red-50 text-red-600 border border-red-200 text-xs p-2.5 rounded">
                            {errors.general[0]}
                        </div>
                    )}

                    <div>
                        <label htmlFor="check_number" className="block text-sm font-normal text-[#14213D] mb-1.5">
                            Check Number
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9C9890]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </span>
                            <input
                                ref={check_numberref}
                                id='check_number'
                                type="text"
                                className="w-full rounded-xs border border-[#DDD9CE] pl-9 pr-3 py-2 text-sm outline-none transition"
                                placeholder="check number"
                                required
                            />
                        </div>
                        {errors && errors.check_number && (
                            <span className="text-red-500 text-xs mt-1 block">{errors.check_number[0]}</span>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-normal text-[#14213D] mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9C9890]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                    <rect x="3" y="11" width="18" height="10" rx="1" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            </span>
                            <input
                                ref={passwordRef}
                                id='password'
                                type="password"
                                className="w-full rounded-xs border border-[#DDD9CE] pl-9 pr-16 py-2 text-sm outline-none transition"
                                placeholder="password *"
                                required
                            />
                        </div>
                        {errors && errors.password && (
                            <span className="text-red-500 text-xs mt-1 block">{errors.password[0]}</span>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <Link to="/forgot-password" className="text-sm text-[#0944c2] hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xs bg-[#0944c2] cursor-pointer text-white text-sm font-medium py-2.5 hover:bg-[#063291] transition disabled:opacity-50"
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>

                <p className="mt-6 text-center text-xs text-[#9C9890]">
                    Venue Yangu · Staff portal
                </p>
            </div>
        </div>
    );
}

export default Login;