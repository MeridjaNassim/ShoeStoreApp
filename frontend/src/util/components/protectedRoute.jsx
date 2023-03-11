import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../features/auth/context/AuthContext";
export const ProtectedRoute = () => {
    const { user, isLoggedIn } = useAuth();
    const canAccessRoute = isLoggedIn && user;
    return (
        <>
            {canAccessRoute ? <Outlet /> : <Navigate to="/login" replace={true} state={{ from: location.pathname }} />}
        </>
    );
}