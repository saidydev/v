import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../Contexts/ContextProvider';

function GuestLayout() {
  const {user, token } = useStateContext();

    if (token) {
      const role = (user?.role || '').toLowerCase().trim();

      if (role === 'teacher') {
        return <Navigate to="/dashboard/home" replace />;
      } else if (role === 'admin') {
        return <Navigate to="/dashboard/admin/home" replace />;
      } else {
        return <Navigate to="/dashboard/home" replace />;
      }
    }

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default GuestLayout