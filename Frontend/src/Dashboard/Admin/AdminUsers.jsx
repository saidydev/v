import React, { useEffect, useRef, useState } from 'react';

import SideNav from './components/SideNav.jsx';

import { Link } from 'react-router-dom';

import axiosClient from '../../axiosClient.jsx';


function AdminUsers() {

    // =========================
    // USERS
    // =========================

    const [people, setPeople] = useState([]);

    const [loading, setLoading] = useState(true);


    // =========================
    // EDIT USER
    // =========================

    const [editingUser, setEditingUser] = useState(null);

    const nameRef = useRef();
    const checkNumberRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const roleRef = useRef();
    const passwordRef = useRef();


    // =========================
    // MESSAGES
    // =========================

    const [success, setSuccess] = useState('');

    const [errors, setErrors] = useState({});

    const [generalError, setGeneralError] = useState('');

    const [updating, setUpdating] = useState(false);


    useEffect(() => {
        setLoading(false);
        axiosClient.get('/users')
            .then(({ data }) => {
                setPeople(data.$people);
            })
            .catch((error) => {
                console.log("ERROR:", error.response?.data);
            });
    }, []);



    const handleEditUser = (person) => {

        setEditingUser(person);

        // Clear previous messages
        setErrors({});

        setGeneralError('');

        setSuccess('');

    };


    // =========================
    // UPDATE USER
    // =========================

    const handleUpdateUser = (e) => {

        e.preventDefault();

        // Clear old messages
        setErrors({});

        setGeneralError('');

        setSuccess('');

        setUpdating(true);


        const payload = {

            name: nameRef.current.value,

            check_number: checkNumberRef.current.value,

            email: emailRef.current.value,

            phone: phoneRef.current.value,

            role: roleRef.current.value,

            password: passwordRef.current.value,

        };


        axiosClient.put(
            `/admin/users/${ editingUser.id }`,
            payload
        )

            .then(({ data }) => {

                console.log('UPDATE RESPONSE:', data);


                // Update user inside table
                setPeople((prevPeople) =>

                    prevPeople.map((person) =>

                        person.id === editingUser.id
                            ? data.user
                            : person

                    )

                );


                // Success message
                setSuccess(
                    'User Updated successfully !!'
                );


                // Close modal
                setEditingUser(null);


                // Clear password
                if (passwordRef.current) {

                    passwordRef.current.value = '';

                }

            })

            .catch((err) => {

                console.error(
                    'UPDATE USER ERROR:',
                    err
                );


                const response = err.response;


                if (response) {

                    // Validation error
                    if (response.status === 422) {

                        setErrors(
                            response.data.errors || {}
                        );

                    }

                    // Other server errors
                    else {

                        setGeneralError(

                            response.data.message ||

                            'Server error occurred. Please try again.'

                        );

                    }

                }

                // Network error
                else {

                    setGeneralError(
                        'Network error. Please check your connection.'
                    );

                }

            })

            .finally(() => {

                setUpdating(false);

            });

    };

    const handleDeleteUser = (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) {
            return;
        }

        axiosClient.delete(`/admin/users/${ id }`)
            .then(({ data }) => {
                console.log('DELETE RESPONSE:', data);

                setPeople((prevPeople) =>
                    prevPeople.filter((person) => person.id !== id)
                );

                setSuccess('User deleted successfully !!');
            })
            .catch((error) => {
                console.error('DELETE USER ERROR:', error);

                setGeneralError(
                    error.response?.data?.message ||
                    'Failed to delete user. Please try again.'
                );
            });
    };

    const handleCloseModal = () => {

        setEditingUser(null);

        setErrors({});

        setGeneralError('');

    };


    return (

        <div className="min-h-screen bg-[#F7F6F3]">

            <SideNav />


            <main className="lg:pl-24 lg:peer-hover:pl-56 transition-[padding] duration-300 ease-in-out w-full px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-3">


                {/* =========================
                    ADMIN HEADER
                ========================= */}

                <div className="relative overflow-hidden rounded-xs bg-linear-to-r from-[#0944c2] to-[#141849] p-6 md:p-8 text-white shadow-xl">

                    <div className="absolute -right-10 -bottom-10 h-44 w-44 rounded-full bg-white/10 blur-2xl pointer-events-none" />


                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">


                        <div className="flex flex-col gap-1.5">

                            <span className="inline-flex max-w-max items-center gap-2 rounded-md bg-white/15 px-3 py-1 text-xs font-medium tracking-wide backdrop-blur-md text-emerald-100">

                                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />

                                Admin Panel

                            </span>


                            <h1 className="text-2xl md:text-3xl font-bold text-white">

                                User Management

                            </h1>


                            <p className="text-emerald-100/80 text-sm font-normal">

                                Manage roles, permissions, and overall system user accounts.

                            </p>

                        </div>


                        <Link
                            to="/dashboard/admin/add-users"
                            className="inline-flex items-center justify-center gap-2 rounded-xs bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-emerald-600 transition"
                        >

                            + Add New User

                        </Link>

                    </div>

                </div>



                {/* =========================
                    SUCCESS MESSAGE
                ========================= */}

                {success && (

                    <div className="rounded-sm border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">

                        {success}

                    </div>

                )}



                {/* =========================
                    GENERAL ERROR
                ========================= */}

                {generalError && !editingUser && (

                    <div className="rounded-sm border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">

                        {generalError}

                    </div>

                )}



                {/* =========================
                    USERS TABLE
                ========================= */}

                <section className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden font-sans">


                    {/* Header */}

                    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">

                        <div>

                            <h2 className="text-base font-semibold text-slate-900 tracking-tight">

                                Manage all users

                            </h2>

                        </div>

                    </div>



                    {/* Table */}

                    <div className="overflow-x-auto">

                        <table className="w-full text-xs text-left border-collapse">


                            <thead>

                                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">

                                    <th className="px-4 py-3.5">
                                        Full name
                                    </th>

                                    <th className="px-4 py-3.5">
                                        Check number
                                    </th>

                                    <th className="px-4 py-3.5">
                                        Role
                                    </th>

                                    <th className="px-4 py-3.5">
                                        Phone number
                                    </th>

                                    <th className="px-4 py-3.5">
                                        Email
                                    </th>

                                    <th className="px-4 py-3.5 text-right">
                                        Action
                                    </th>

                                </tr>

                            </thead>



                            <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">


                                {/* Loading */}

                                {loading && (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="px-4 py-10 text-center text-slate-500"
                                        >

                                            Loading users...

                                        </td>

                                    </tr>

                                )}



                                {/* No users */}

                                {!loading && people.length === 0 && (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="px-4 py-10 text-center text-slate-500"
                                        >

                                            No users found.

                                        </td>

                                    </tr>

                                )}



                                {/* Users */}

                                {!loading && people.map((person) => (

                                    <tr
                                        key={person.id}
                                        className="hover:bg-slate-50/80 transition-colors"
                                    >


                                        {/* Name */}

                                        <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">

                                            <div className="flex items-center gap-3">

                                                <span>

                                                    {person?.name || 'N/A'}

                                                </span>

                                            </div>

                                        </td>



                                        {/* Check Number */}

                                        <td className="px-4 py-3 font-mono text-slate-600 whitespace-nowrap">

                                            {person?.check_number || '—'}

                                        </td>



                                        {/* Role */}

                                        <td className="px-4 py-3 whitespace-nowrap">

                                            <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">

                                                {person?.role || 'User'}

                                            </span>

                                        </td>



                                        {/* Phone */}

                                        <td className="px-4 py-3 whitespace-nowrap text-slate-600">

                                            {person?.phone || '—'}

                                        </td>



                                        {/* Email */}

                                        <td className="px-4 py-3 whitespace-nowrap text-slate-600">

                                            {person?.email || '—'}

                                        </td>



                                        {/* Actions */}

                                        <td className="px-4 py-3 whitespace-nowrap text-right">

                                            <div className="flex items-center justify-end gap-2">


                                                {/* Edit */}

                                                <button
                                                    type="button"
                                                    onClick={() => handleEditUser(person)}
                                                    className="rounded-sm border border-slate-200 px-2.5 cursor-pointer py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                                                >

                                                    Edit

                                                </button>



                                                {/* Delete */}
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteUser(person.id)}
                                                    className="rounded-sm border border-rose-200 cursor-pointer bg-rose-50/50 px-2.5 py-1 text-xs font-medium text-rose-600 hover:bg-rose-100 transition-colors"
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>



                    {/* =========================
                        EDIT MODAL
                    ========================= */}

                    {editingUser && (

                        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">


                            <div className="w-full max-w-2xl bg-white rounded-sm shadow-2xl">


                                {/* Modal Header */}

                                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">


                                    <div>

                                        <h2 className="text-lg font-semibold text-slate-900">

                                            Edit User

                                        </h2>


                                        <p className="text-xs text-slate-500 mt-1">

                                            Update user information below

                                        </p>

                                    </div>



                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="w-8 h-8 flex items-center justify-center rounded-sm text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                                    >

                                        ✕

                                    </button>

                                </div>



                                {/* Form */}

                                <form
                                    className="p-6"
                                    onSubmit={handleUpdateUser}
                                >


                                    {/* General Error inside modal */}

                                    {generalError && (

                                        <div className="mb-4 rounded-sm border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">

                                            {generalError}

                                        </div>

                                    )}



                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                                        {/* Full Name */}

                                        <div>

                                            <label className="block text-sm font-medium text-[#14213D] mb-1.5">

                                                Full name

                                            </label>


                                            <input
                                                type="text"
                                                ref={nameRef}
                                                defaultValue={editingUser.name}
                                                className="w-full rounded-sm border border-[#DDD9CE] px-3 py-2 text-sm outline-none focus:border-[#0944c2] transition"
                                            />


                                            {errors.name && (

                                                <p className="mt-1 text-xs text-rose-600">

                                                    {errors.name[0]}

                                                </p>

                                            )}

                                        </div>



                                        {/* Check Number */}

                                        <div>

                                            <label className="block text-sm font-medium text-[#14213D] mb-1.5">

                                                Check Number

                                            </label>


                                            <input
                                                type="text"
                                                ref={checkNumberRef}
                                                defaultValue={editingUser.check_number}
                                                className="w-full rounded-sm border border-[#DDD9CE] px-3 py-2 text-sm outline-none focus:border-[#0944c2] transition"
                                            />


                                            {errors.check_number && (

                                                <p className="mt-1 text-xs text-rose-600">

                                                    {errors.check_number[0]}

                                                </p>

                                            )}

                                        </div>



                                        {/* Email */}

                                        <div>

                                            <label className="block text-sm font-medium text-[#14213D] mb-1.5">

                                                Email

                                            </label>


                                            <input
                                                type="email"
                                                ref={emailRef}
                                                defaultValue={editingUser.email}
                                                className="w-full rounded-sm border border-[#DDD9CE] px-3 py-2 text-sm outline-none focus:border-[#0944c2] transition"
                                            />


                                            {errors.email && (

                                                <p className="mt-1 text-xs text-rose-600">

                                                    {errors.email[0]}

                                                </p>

                                            )}

                                        </div>



                                        {/* Phone */}

                                        <div>

                                            <label className="block text-sm font-medium text-[#14213D] mb-1.5">

                                                Phone

                                            </label>


                                            <input
                                                type="text"
                                                ref={phoneRef}
                                                defaultValue={editingUser.phone || ''}
                                                className="w-full rounded-sm border border-[#DDD9CE] px-3 py-2 text-sm outline-none focus:border-[#0944c2] transition"
                                            />


                                            {errors.phone && (

                                                <p className="mt-1 text-xs text-rose-600">

                                                    {errors.phone[0]}

                                                </p>

                                            )}

                                        </div>



                                        {/* Role */}

                                        <div>

                                            <label className="block text-sm font-medium text-[#14213D] mb-1.5">

                                                Role

                                            </label>


                                            <select
                                                ref={roleRef}
                                                defaultValue={editingUser.role}
                                                className="w-full rounded-sm border border-[#DDD9CE] px-3 py-2 text-sm outline-none focus:border-[#0944c2] transition bg-white"
                                            >

                                                <option value="Teacher">
                                                    Teacher
                                                </option>

                                                <option value="Admin">
                                                    Admin
                                                </option>

                                            </select>


                                            {errors.role && (

                                                <p className="mt-1 text-xs text-rose-600">

                                                    {errors.role[0]}

                                                </p>

                                            )}

                                        </div>



                                        {/* Password */}

                                        <div>

                                            <label className="block text-sm font-medium text-[#14213D] mb-1.5">

                                                New Password

                                            </label>


                                            <input
                                                type="password"
                                                ref={passwordRef}
                                                placeholder="Leave blank to keep current password"
                                                className="w-full rounded-sm border border-[#DDD9CE] px-3 py-2 text-sm outline-none focus:border-[#0944c2] transition"
                                            />


                                            {errors.password && (

                                                <p className="mt-1 text-xs text-rose-600">

                                                    {errors.password[0]}

                                                </p>

                                            )}

                                        </div>

                                    </div>



                                    {/* Buttons */}

                                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">


                                        <button
                                            type="button"
                                            onClick={handleCloseModal}
                                            disabled={updating}
                                            className="px-4 py-2 rounded-sm border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition disabled:opacity-50"
                                        >

                                            Cancel

                                        </button>


                                        <button
                                            type="submit"
                                            disabled={updating}
                                            className="px-5 py-2 rounded-sm bg-[#0944c2] text-white text-sm font-medium hover:bg-[#063291] transition disabled:opacity-50"
                                        >

                                            {updating
                                                ? 'Updating...'
                                                : 'Update User'
                                            }

                                        </button>

                                    </div>

                                </form>

                            </div>

                        </div>

                    )}

                </section>

            </main>

        </div>

    );

}

export default AdminUsers;