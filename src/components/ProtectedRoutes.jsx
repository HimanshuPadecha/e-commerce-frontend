import { Outlet,Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoutes() {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

    return isLoggedIn ? <Outlet /> : <Navigate to='/login' />
}


export default ProtectedRoutes