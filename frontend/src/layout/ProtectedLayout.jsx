import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/auth/useAuth";

export function ProtectedLayout()
{
    const auth = useAuth();

    if(auth.signed){
        return <Outlet />;
    } else {
        return <Navigate to="/login" />;
    }

}