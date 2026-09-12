import { createBrowserRouter } from "react-router-dom";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import ForgotPassword from "./Authentication/ForgotPaswword";
import DefaultLayout from "./Layouts/DefaultLayout";
import Home from "./Dashboard/Home";
import Profile from "./Dashboard/Profile";
import Bookings from "./Dashboard/Bookings";
import GuestLayout from "./Layouts/GuestLayout";
import AdminLayout from "./Layouts/AdminLayout";
import AdminHome from "./Dashboard/Admin/AdminHome";
import AdminProfile from "./Dashboard/Admin/AdminProfile";
import AdminBookings from "./Dashboard/Admin/AdminBookings";
import Users from "./Dashboard/Admin/AdminUsers";
import AdminAddUsers from "./Dashboard/Admin/AdminAddUsers";

const router = createBrowserRouter([
    {
        element: <GuestLayout />,
        children: [
            {
                path: "/",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/forgot-password",
                element: <ForgotPassword />
            },
        ]
    },

    {
        element: <DefaultLayout />,
        children: [
            {
                path: "/dashboard/home",
                element: <Home />
            },
            {
                path: "/dashboard/profile",
                element: <Profile />
            },
            {
                path: "/dashboard/bookings",
                element: <Bookings />
            },

        ]
    },

    {
        element:<AdminLayout/>,
        children:[
            {
                path: "/dashboard/admin/home",
                element: <AdminHome/>
            },
            {
                path: "/dashboard/admin/profile",
                element: <AdminProfile/>
            },
            {
                path: "/dashboard/admin/bookings",
                element: <AdminBookings/>
            },
            {
                path: "/dashboard/admin/users",
                element: <Users/>
            },
            {
                path: "/dashboard/admin/add-users",
                element: <AdminAddUsers/>
            },
        ]
    },
    


    {
        path: "*",
        element: <div>404 Not Found</div>
    }

])

export default router;