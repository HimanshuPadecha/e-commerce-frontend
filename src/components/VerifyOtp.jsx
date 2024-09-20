import React from 'react'

function VerifyOtp() {
  return (
    <div className=" bg-black text-white p-4 mt-12">
    <div className="form-box m-auto mt-12 ">
      <form className="form">
        <span className="title">Enter OTP</span>

        <div className="form-container">
          <input type="number" className="input mb-5" placeholder="OTP" />
        <button type="submit">Submit</button>

        </div>

      </form>

      
    </div>
    </div>
  )
}

export default VerifyOtp
