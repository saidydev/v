import React, { useState } from 'react';
import { Form, Link, useLocation } from 'react-router-dom';
import axiosClient from '../../axiosClient.jsx';

function SideNav() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => setIsOpen(!isOpen);


    const handleLogout = (e) => {
        e.preventDefault();

        axiosClient.post('/logout')
            .then(() => {
                localStorage.removeItem('ACCESS_TOKEN');

                window.location.href = '/';
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            {/* Mobile Header Bar with Hamburger Menu */}
            <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
                <span className="text-base font-bold text-[#14213D]">Dashboard</span>
                <button
                    type="button"
                    onClick={toggleSidebar}
                    className="p-2 inline-flex justify-center items-center rounded-xs border border-gray-200 bg-white text-gray-700 shadow-xs hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Toggle navigation"
                >
                    {/* Hamburger Icon */}
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Mobile Backdrop Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden transition-opacity"
                    onClick={toggleSidebar}
                />
            )}

            {/* Expandable Sidebar Container */}
            <aside
                className={`peer group fixed top-0 left-0 z-50 h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out w-20 hover:w-56 lg:translate-x-0 ${ isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                aria-label="Sidebar"
            >
                <div className="relative flex flex-col h-full">
                    {/* Header / Logo */}
                    <header className="p-4 flex items-center justify-between overflow-hidden border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-xs bg-blue-600 shrink-0" />
                            <span className="font-serif font-bold text-[#14213D] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                Venue Yangu
                            </span>
                        </div>

                        {/* Mobile Close Button */}
                        <div className="lg:hidden">
                            <button
                                type="button"
                                onClick={toggleSidebar}
                                className="flex justify-center items-center w-6 h-6 bg-gray-100 border border-gray-200 text-gray-500 rounded-full hover:bg-gray-200 focus:outline-none"
                            >
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                <span className="sr-only">Close Sidebar</span>
                            </button>
                        </div>
                    </header>

                    <nav className="h-full px-3 py-4">
                        <div className="flex flex-col gap-y-2">

                            <Link
                                to="/dashboard/home"
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-x-4 p-2.5 rounded-xs transition-colors ${ location.pathname === '/dashboard/home'
                                    ? 'bg-blue-100 text-blue-600'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <svg className="w-6 h-6 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                                <span className="text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                    Dashboard
                                </span>
                            </Link>

                            {/* Profile Link */}
                            <Link
                                to="/dashboard/profile"
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-x-4 p-2.5 rounded-xs transition-colors ${ location.pathname === '/dashboard/profile'
                                    ? 'bg-blue-100 text-blue-600'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <svg className="w-6 h-6 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                <span className="text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                    Profile
                                </span>
                            </Link>

                            {/* Bookings Link */}
                            <Link
                                to="/dashboard/bookings"
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-x-4 p-2.5 rounded-xs transition-colors ${ location.pathname === '/dashboard/bookings'
                                    ? 'bg-blue-100 text-blue-600'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <svg className="w-6 h-6 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" /></svg>
                                <span className="text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                    Bookings
                                </span>
                            </Link>

                            <form onSubmit={handleLogout} className='cursor-pointer text-gray-600 hover:bg-gray-100'>
                                <button className="flex items-center gap-x-4 p-2.5 rounded-xs transition-colors">
                                    <svg
                                        className="w-6 h-6 shrink-0"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                        <polyline points="16 17 21 12 16 7" />
                                        <line x1="21" y1="12" x2="9" y2="12" />
                                    </svg>
                                <span className="text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                    Log out
                                </span>
                            </button>
                        </form>

                </div>
            </nav>
        </div >
            </aside >
        </>
    );
}

export default SideNav;