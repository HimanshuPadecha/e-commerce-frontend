import React from 'react'

function EditDetails() {
  return (
    <div className=" bg-black text-white p-4 mt-12">
    <div className="form-box m-auto mt-12 ">
      <form className="form">
        <span className="title">Edit details</span>
        <span className="subtitle">Edit details your existing account.</span>

        <div className="form-container">
          <input type="email" className="input mb-5" placeholder="Email" />
          <input type="text" className="input mb-5" placeholder="Username" />
          <input type="text" className="input mb-5" placeholder="Address" />
         
        </div>

        <button type="submit">Log in</button>
      </form>

      <div className="form-section">
        <p>Don't have an account? <a href="/Sign up">Sign up</a></p>
      </div>
    </div>
    </div>
  )
}

export default EditDetails
