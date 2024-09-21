import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import axios from "axios";
import { url } from "../url";
import { useDispatch } from "react-redux";
import { login } from "../store/auth.reducer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggle,setToggle] = useState(false)

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isValidEmail(email) || !email) {
      setError("Please enter valid email");
      return;
    }

    if (password.length < 8 || !password) {
      setError("Enter proper credentials to sign up");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${url}/users/login`,
        {
          email,
          password,
        },
        { withCredentials: true, timeout: 5000 }
      );
      if (response) {
        const userData = await axios.get(`${url}/users/get-current-user`, {
          withCredentials: true,
          timeout: 5000,
        });

        if (userData) {
          dispatch(login(userData.data));
          setEmail("");
          setPassword("");

          toast.success("Logged in to your account! 🎉", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "toast",
          });

          navigate("/");
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // Display server error message
        console.log(error.response.data);

        setError(
          error.response.data.message || "An error occurred. Please try again."
        );
      } else if (error.code == "ECONNABORTED") {
        setError("Request timed out ! please try again ");
      } else {
        // Fallback to generic error message if no response data
        setError(error.message || "An unexpected error occurred.");
      }
      console.log(error);
    }
    setLoading(false);
  };


  const handleForgotPassword = async(e)=>{
    e.preventDefault()
    setError("")
    if (!isValidEmail(email) || !email) {
      setError("Please enter email to get OTP");
      return;
    }
    setLoading(true)
    try {
      const response = await axios.post(`${url}/users/forgot-password`,{email},{withCredentials:true,timeout:9000})
      if(response){

        toast.success("OTP sent, valid for 10 minutes", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "toast",
        });
        setEmail("")
        navigate(`/verify-otp/${email}`)
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // Display server error message
        console.log(error.response.data);

        setError(
          error.response.data.message || "An error occurred. Please try again."
        );
      } else if (error.code == "ECONNABORTED") {
        setError("Request timed out ! please try again ");
      } else {
        // Fallback to generic error message if no response data
        setError(error.message || "An unexpected error occurred.");
      }
      console.log(error);
    }
    setLoading(false)
  }

  return (
    <div className=" bg-black text-white p-4 mt-12">
      <div className="form-box m-auto mt-12 ">
        <form className="form" onSubmit={handleSubmit}>
          <span className="title">Log in</span>
          <span className="subtitle">Log in to your existing account.</span>

          <div className="form-container">
            <input
              type="email"
              className="input mb-5"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              name="email"
            />

            <div className="flex pr-4 item-center justify-end">
              <input
                type={toggle ? "text": "password"}
                className="input mb-5"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input type="checkbox" className="switch" checked={toggle} onChange={e=> setToggle(e.target.checked)}/>
            </div>

          
              <span className="subtitle cursor-pointer" onClick={handleForgotPassword}>Forgot password</span>
           
          </div>

          <button
            type="submit"
            className="flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <Loader /> : "Login"}
          </button>

          
        </form>

        <div className="form-section">
          <span className="text-red-500 font-semibold mt-2">{error}</span>

          <p>
            Don't have an account?{" "}
            <Link to="/signup">
              <span>Sign up </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
