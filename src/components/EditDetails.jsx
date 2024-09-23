import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { url } from '../url'
import Loader from './Loader'

function EditDetails() {
    const [loading,setLoading]= useState(false)
    const [email,setEmail] = useState("")
    const [address,setAddress] = useState("")
    const [username,setUsername] = useState("")

    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    const handlesubmit = async(e)=>{
      e.preventDefault()
      if(!email && !address && !username){
        toast.success("You have to at least provide one field to change", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "toast",
          });
          return
      }

      if(email){
        if(!isValidEmail(email)){
          toast.success("Invalid email", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "toast",
          });
          return
        }
      }


      setLoading(true)
      try {
        const response = await axios.patch(`${url}/users/edit-user`,{email,username,address},{withCredentials:true,timeout:5000})
        if(response){
          setAddress("")
          setEmail("")
          setUsername("")
          toast.success("Details changed successfully", {
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
  
          toast.success(`${error.response.data.message}`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "toast",
          });
        } else if (error.code == "ECONNABORTED") {
          toast.success("Request timed out...", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "toast",
          });
        } else {
          // Fallback to generic error message if no response data
          toast.success("Unexpected error occoured !!", {
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
        console.log(error);
        
      }
      setLoading(false)
    }

  return (
    <div className=" bg-black text-white p-4 mt-12">
    <div className="form-box m-auto mt-12 ">
      <form className="form" onSubmit={handlesubmit}>
        <span className="title">Edit details</span>
        <span className="subtitle">Edit details to your existing account.</span>

        <div className="form-container">
          <input 
          type="email" 
          className="input mb-5" 
          placeholder="Email" 
          value={email}
          onChange={e=>setEmail(e.target.value)}
          />
          <input 
          type="text" 
          className="input mb-5" 
          placeholder="Username" 
          value={username}
          onChange={e=>setUsername(e.target.value)}
          />
          <input 
          type="text" 
          className="input mb-5" 
          placeholder="Address"
          value={address}
          onChange={e=>setAddress(e.target.value)}
           />
         
        </div>

        <button type="submit" disabled={loading} className='flex items-center justify-center'>
          {loading ? <Loader /> : "Change"}
        </button>
      </form>

      
    </div>
    </div>
  )
}

export default EditDetails
