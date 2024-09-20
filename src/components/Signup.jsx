import React from 'react';

const Signup = () => {
  return (
    <div className=" bg-black text-white p-4 mt-12">
    <div className="form-box m-auto mt-12 ">
      <form className="form">
        <span className="title">Sign up</span>
        <span className="subtitle">Create a free account with your email.</span>

        <div className="form-container">
          <input type="text" className="input mb-5" placeholder="User Name" />
          <input type="email" className="input mb-5" placeholder="Email" />
          <input type="text" className="input mb-5" placeholder="Address" />
          <input type="password" className="input mb-5" placeholder="Password" />
        </div>

        <button type="submit">Sign up</button>
      </form>

      <div className="form-section">
        <p>Have an account? <a href="/Login">Login</a></p>
      </div>
    </div>
    </div>
  );
};

export default Signup;
