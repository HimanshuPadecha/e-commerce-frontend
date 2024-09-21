import React, { useState } from "react";
import MoreOptions from "./MoreOptions";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { url } from "../../url";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth.reducer";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';  


const Nav = () => {
  const authenticated = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error,setError] = useState("")
  const navItems = [
    {
      authenticated:!authenticated,
      path: "/",
      text: "Home",
    },
    {
      authenticated,
      path: "/ordered",
      text: "Ordered",
    },
    {
      authenticated,
      path: "/deliver",
      text: "Deliver",
    },
    {
      authenticated: !authenticated,
      path: "/login",
      text: "Login",
    },
    {
      authenticated: !authenticated,
      path: "/signup",
      text: "Signup",
    },
    {
      authenticated,
      path: "/",
      text: "Home",
    },
  ];

  const handleLogout = async(e) =>{
    e.preventDefault()

    try {
      const response = await axios.get(`${url}/users/logout`,{withCredentials:true,timeout:2000})
      console.log(response);
      if(response){
          dispatch(logout())

          toast.success("Logged out !",{
            position:"bottom-right",
            autoClose:3000,
            hideProgressBar:false,
            closeOnClick:true,
            pauseOnHover:true,
            draggable:true,
            progress:undefined,
            className:"toast"
          })

          navigate("/login")
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // Display server error message
        console.log(error.response.data);
        
        // setError(error.response.data.message || "An error occurred. Please try again.");


        toast.success(`${error.response.data.message}`,{
          position:"bottom-right",
          autoClose:3000,
          hideProgressBar:false,
          closeOnClick:true,
          pauseOnHover:true,
          draggable:true,
          progress:undefined,
          className:"toast"
        })
      } else if(error.code == "ECONNABORTED"){
        toast.success("Request timed out...",{
          position:"bottom-right",
          autoClose:3000,
          hideProgressBar:false,
          closeOnClick:true,
          pauseOnHover:true,
          draggable:true,
          progress:undefined,
          className:"toast"
        })
      }
      else{
        toast.success("Unexpected error occoured !!",{
          position:"bottom-right",
          autoClose:3000,
          hideProgressBar:false,
          closeOnClick:true,
          pauseOnHover:true,
          draggable:true,
          progress:undefined,
          className:"toast"
        })
      }
      console.log(error);
    }
  }

  return (
    <nav className="bg-white bg-opacity-10 backdrop-blur-md w-full fixed top-0 left-0 z-10 nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand on the left */}
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-white text-xl font-bold">Ecommerce</h1>
          </div>

          {/* Links on the right */}
          <div className="sm:flex sm:space-x-8 items-center">
            {/* Link Components for navigation */}
            {navItems.map((item,index) =>
              item.authenticated ? (
                <Link to={item.path} key={index}>
                  <span className="text-white hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium">
                    {item.text}
                  </span>
                </Link>
              ) : (
                ""
              )
            )}
            {authenticated ? <span className="text-white hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium cursor-pointer" onClick={handleLogout}>
              Logout
            </span>: ""}

            {/* More Options */}
            {authenticated ? <MoreOptions />:  ""}
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

// <Link to="/">
//               <span className="text-white hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium">Home</span>
//             </Link>
//             <Link to="/ordered">
//               <span className="text-white hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium">Ordered</span>
//             </Link>
//             <Link to="/deliver">
//               <span className="text-white hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium">Deliver</span>
//             </Link>
//             <Link to="/login">
//               <span className="text-white hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium">Login</span>
//             </Link>
//             <Link to="/signup">
//               <span className="text-white hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium">Signup</span>
//             </Link>





{/*  */}