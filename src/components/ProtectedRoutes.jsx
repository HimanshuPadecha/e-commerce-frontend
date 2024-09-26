import { Outlet,Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login,logout } from "../store/auth.reducer";
import Loader from "./Loader";
import { url } from "../url";

function ProtectedRoutes() {
    // const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(true)

   useEffect(()=>{

    const isRegistered = async () =>{
        try {
            const response = await axios.get(`${url}/users/get-current-user`,{withCredentials:true,timeout:5000})
            // console.log(response);
            setIsLoggedIn(true)
            
            if(response){
                dispatch(login(response.data))
            }
        } catch (error) {
            console.log(error);
            dispatch(logout())
        }finally{
            setLoading(false)
        }
    }
    isRegistered()
   },[])

   if(loading){
    return <div className="container min-h-screen flex items-center justify-center"><Loader /></div>
   }
    return isLoggedIn ? <Outlet /> : <Navigate to='/login' />
}


export default ProtectedRoutes