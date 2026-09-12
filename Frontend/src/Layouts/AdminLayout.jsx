import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../Contexts/ContextProvider';

export default function AdminLayout() {

    const { token, user } = useStateContext();
    if (!token) {
        return <Navigate to="/" replace />;
    }

    if (user?.role?.toLowerCase() !== 'admin') {
        return <Navigate to="/dashboard/home" replace />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
}