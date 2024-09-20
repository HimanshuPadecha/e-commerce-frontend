import React from 'react'

function ChangePassword() {
  return (
    <div className=" bg-black text-white p-4 mt-12">
    <div className="form-box m-auto mt-12 ">
      <form className="form">
        <span className="title">Change Password</span>

        <div className="form-container">
          <input type="password" className="input mb-5" placeholder="Old Password" />
          <input type="password" className="input" placeholder="New Password" />
        </div>

        <button type="submit">Change Password</button>
      </form>

    </div>
    </div>
  )
}

export default ChangePassword
