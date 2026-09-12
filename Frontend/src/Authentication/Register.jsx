import React, { useRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axiosClient from '../axiosClient';
import { useStateContext } from '../Contexts/ContextProvider';

function Register() {
  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);
  const [generalError, setGeneralError] = useState('');
  const [success, setSuccess] = useState('');

  const nameRef = useRef();
  const check_numberRef = useRef();
  const emailRef = useRef();
  const roleRef = useRef();
  const passwordRef = useRef();

  const SubmitForm = (e) => {
    e.preventDefault();
    setErrors(null);
    setGeneralError('');
    setSuccess('');

    const payload = {
      name: nameRef.current.value,
      check_number: check_numberRef.current.value,
      email: emailRef.current.value,
      role: roleRef.current.value,
      password: passwordRef.current.value,
    };

    axiosClient.post('/register', payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
        setSuccess("Teacher registered successfully");

        // Clear input values
        nameRef.current.value = '';
        check_numberRef.current.value = '';
        emailRef.current.value = '';
        roleRef.current.value = '';
        passwordRef.current.value = '';
      })
      .catch((err) => {
        const response = err.response;
        if (response) {
          // Validation Errors (Status Code 422)
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
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F6F3] px-4">
      <div className="w-full max-w-2xl">
        <form className="bg-white rounded-xs flex flex-col gap-4 p-6 shadow-sm border border-[#EDEBE3] w-full" onSubmit={SubmitForm}>
          
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

          <div className="flex flex-col gap-2">
            <h1 className="mt-2 text-xl font-medium">Register a teacher</h1>
            <hr className="border-none bg-[#0944c2] h-1 w-7" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Full Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-normal text-[#14213D] mb-1.5">
                Full name
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9C9890]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  ref={nameRef}
                  type="text"
                  className={`w-full rounded-xs border ${errors?.name ? 'border-rose-500' : 'border-[#DDD9CE]'} pl-9 pr-3 py-2 text-sm outline-none transition`}
                  placeholder="full name"
                />
              </div>
              {errors?.name && (
                <p className="mt-1 text-xs text-rose-600 font-medium">{errors.name[0]}</p>
              )}
            </div>

            {/* Check Number Field */}
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
                  ref={check_numberRef}
                  type="text"
                  className={`w-full rounded-xs border ${errors?.check_number ? 'border-rose-500' : 'border-[#DDD9CE]'} pl-9 pr-3 py-2 text-sm outline-none transition`}
                  placeholder="check number"
                />
              </div>
              {errors?.check_number && (
                <p className="mt-1 text-xs text-rose-600 font-medium">{errors.check_number[0]}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-normal text-[#14213D] mb-1.5">
                Email
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9C9890]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="5" width="18" height="14" rx="1" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </span>
                <input
                  ref={emailRef}
                  type="email"
                  className={`w-full rounded-xs border ${errors?.email ? 'border-rose-500' : 'border-[#DDD9CE]'} pl-9 pr-3 py-2 text-sm outline-none transition`}
                  placeholder="you@company.com"
                />
              </div>
              {errors?.email && (
                <p className="mt-1 text-xs text-rose-600 font-medium">{errors.email[0]}</p>
              )}
            </div>

            {/* Role Field */}
            <div>
              <label htmlFor="role" className="block text-sm font-normal text-[#14213D] mb-1.5">
                Role
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
                  ref={roleRef}
                  type="text"
                  className={`w-full rounded-xs border ${errors?.role ? 'border-rose-500' : 'border-[#DDD9CE]'} pl-9 pr-3 py-2 text-sm outline-none transition`}
                  placeholder="Role eg. Admin or Teacher"
                />
              </div>
              {errors?.role && (
                <p className="mt-1 text-xs text-rose-600 font-medium">{errors.role[0]}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="md:col-span-2">
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
                  type="password"
                  className={`w-full rounded-xs border ${errors?.password ? 'border-rose-500' : 'border-[#DDD9CE]'} pl-9 pr-3 py-2 text-sm outline-none transition`}
                  placeholder="password *"
                />
              </div>
              {errors?.password && (
                <p className="mt-1 text-xs text-rose-600 font-medium">{errors.password[0]}</p>
              )}
            </div>

          </div>

          <button
            type="submit"
            className="w-full rounded-xs bg-[#0944c2] cursor-pointer text-white text-sm font-medium py-2.5 hover:bg-[#063291] transition mt-2"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-[#9C9890]">
          Venue Yangu · Staff portal
        </p>
      </div>
    </div>
  );
}

export default Register;