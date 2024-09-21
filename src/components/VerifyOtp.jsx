import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { url } from '../url'
import { toast } from 'react-toastify'
import Loader from './Loader'

function VerifyOtp() {
  const [otp,setOtp] = useState("")
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")
  const {email} = useParams()
  const navigate = useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault()
    setError("")
    if(!otp.length ||  otp.length != 6){
      setError("Invalid otp. must be 6 character")
      return
    }

    setLoading(true)
    try {
      const response = await axios.post(`${url}/users/validate-otp`,{email,otp},{withCredentials:true})
      if(response){

        toast.success("correct otp, change password now!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "toast",
        });
        setOtp("")
        navigate(`/change-password-otp/${email}`) 

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
        <span className="title">Enter OTP</span>

        <div className="form-container">
          <input type="number" 
          className="input mb-5" 
          placeholder="OTP" 
          value={otp}
          onChange={e=>setOtp(e.target.value)}
          />
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
        </div>

      </form>

      
    </div>
    </div>
  )
}

export default VerifyOtp
