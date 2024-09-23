import React, { useState } from 'react'
import Loader from './Loader'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { url } from '../url'
import { useDispatch } from 'react-redux'
import { login } from '../store/auth.reducer'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function ChangePassword({type}) {
 
  if(!type){
    var {email} = useParams()
  }
  const navigate = useNavigate()
  const [error,setError] = useState("")
  const [passwordOne,setPasswordOne] = useState("")
  const [toggle,setToggle] = useState(false)
  const [toggleTwo,setToggleTwo] = useState(false)
  const [passwordTwo,setPasswordTwo] = useState("")
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = async (e)=>{
    e.preventDefault()

    if(!passwordOne || !passwordTwo){
      setError("Provide both passwords")
    }

    if(type){
      setLoading(true)
      setError("")
      try {
        const response = await axios.patch(`${url}/users/change-password`,{password:passwordOne,newPassword:passwordTwo},{withCredentials:true,timeout:5000})
        if(response){
          toast.success("Password changed for this account", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "toast",
          });
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
    }else{
      if((passwordOne !== passwordTwo) || passwordOne.length<8){
        setError("password is not matched with confirm password or too short")
      }
        setLoading(true)
      try {
        const response = await axios.post(`${url}/users/change-forgotted-password`,{email,password:passwordOne},{withCredentials:true,timeout:5000})

        if(response){
          const user = await axios.post(`${url}/users/login`,{email,password:passwordOne},{withCredentials:true,timeout:5000})
          console.log(user);
          if(user){
            dispatch(login(response.data))
            setPasswordOne("")
            setPasswordTwo("")

            toast.success("Password changed and Logged in..", {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              className: "toast",
            });

            navigate("/")
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
    }
    setLoading(false)
  }

  return (
    <div className=" bg-black text-white p-4 mt-12">
    <div className="form-box m-auto mt-12 ">
      <form className="form" onSubmit={handleSubmit}>
        <span className="title">Change Password</span>

        <div className="form-container">
          

          <div className="flex pr-4 pt-2 item-center justify-end">
          <input 
          type={toggle ? "text" : "password"} 
          className="input mb-5"
           placeholder={type ? "Old password": "Password"} 
           value={passwordOne}
           onChange={e=>setPasswordOne(e.target.value)}
           />
              <input type="checkbox" className="switch" checked={toggle} onChange={e=> setToggle(e.target.checked)}/>
            </div>


          <div className="flex pr-4 pt-2 item-center justify-end">
          <input type={toggleTwo ? "text": "password" }
          className="input" 
          placeholder={type ? "New Password" : "Confirm password"}
          value={passwordTwo}
          onChange={e=>setPasswordTwo(e.target.value)}
          />
              <input type="checkbox" className="switch" checked={toggleTwo} onChange={e=> setToggleTwo(e.target.checked)}/>
            </div> 
        </div>

        <button
            type="submit"
            className="flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <Loader /> : "Submit"}
          </button>

          <div className="form-section">
          <span className="text-red-500 font-semibold mt-2">{error}</span>
        </div>
        
      </form>

    </div>
    </div>
  )
}

export default ChangePassword
