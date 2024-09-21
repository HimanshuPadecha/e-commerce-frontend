import React, { useState } from 'react';
import axios from 'axios';
import { url } from '../url';
import { useDispatch } from 'react-redux';
import {login} from "../store/auth.reducer"
import { Link, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email,setEmail] = useState("")
  const [address,setAddress] = useState("")
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")
  const [messsage,setMessage] = useState("")
  const [balance,setBalnce] = useState("")
  const [loading,setLoading] = useState(false)

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleSubmit = async(e)=>{
      e.preventDefault()
      setError("")
      if(!isValidEmail(email) || !email){
          setError("Please enter valid email")
          return
      }

      if(balance <= 0 ){
        setError("Balance is invalid")
        return
      }

      const parsedBalance = parseFloat(balance)

      if(password.length < 8 || !password || !address || !username)
      {
        setError("Enter proper credentials to sign up")
        return
      }
        setLoading(true)
      try {
        const response = await axios.post(`${url}/users/register`,{
          email,address,password,username,balance:parsedBalance
        })
        console.log("response from sign up :",response);
        if(response){
          const user = await axios.post(`${url}/users/login`,{
            email,password
          },{
            withCredentials:true
          })
            console.log("login log :",user);
            
          if(user){
            const userData = await axios.get(`${url}/users/get-current-user`,{withCredentials:true})
            console.log("userDate log:",userData); 
            if(userData){
                dispatch(login(userData.data))
                setMessage("You have created account successfully !!")
                setEmail("");
                setAddress("");
                setUsername("");
                setPassword("");
                setError("");

                toast.success('Account created successfully! 🎉', {
                  position: "bottom-right",
                  autoClose: 3000, 
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  className:"toast"
                });


                navigate("/")
            }
          }
        }
      } catch (error) {
        if (error.response && error.response.data) {
          // Display server error message
          console.log(error.response.data);
          
          setError(error.response.data.message || "An error occurred. Please try again.");
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
        <span className="title">Sign up</span>
        <span className="subtitle">Create a free account with your email.</span>

        <div className="form-container">
          <input 
          type="text"
          className="input mb-5" 
          placeholder="User Name"
          value={username}
          onChange={e=>setUsername(e.target.value)}
          />
          <input 
          type="number"
          className="input mb-5" 
          placeholder="Balance"
          value={balance}
          onChange={e=>setBalnce(e.target.value)}
          />
          <input 
          type="email" 
          className="input mb-5" 
          placeholder="Email" 
          value={email}
          onChange={e => setEmail(e.target.value)}
          />
          <input type="text" 
          className="input mb-5" 
          placeholder="Address" 
          value={address}
          onChange={e=> setAddress(e.target.value)}
          />
          <input 
          type="text" 
          className="input mb-5" 
          placeholder="Password" 
          value={password}
          onChange={e=>setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="flex items-center justify-center" disabled={loading}>{loading ? <Loader /> : "Sign up"}</button>
      </form>

      <span>{messsage}</span>

      <div className="form-section ">
      <span className='text-red-500 font-semibold mt-2'>{error}</span>
        <p>Have an account? <Link to='/login'><span>Login</span></Link></p>
      </div>
    </div>
    </div>
  );
};

export default Signup;
