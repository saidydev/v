import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";

function DefaultLayout() {
    const { user, token } = useStateContext();
    if (!token) {
        return <Navigate to="/" replace />;
    }


    return (
        <div>
            <Outlet />
        </div>
    );
}

export default DefaultLayout;