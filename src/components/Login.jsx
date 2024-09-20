import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
  <div className=" bg-black text-white p-4 mt-12">
    <div className="form-box m-auto mt-12 ">
      <form className="form">
        <span className="title">Log in</span>
        <span className="subtitle">Log in to your existing account.</span>

        <div className="form-container">
          <input type="email" className="input mb-5" placeholder="Email" />
          <input type="password" className="input mb-5" placeholder="Password" />
          <Link to="/verify-otp">
          <span className="subtitle">Forgot password</span>
          </Link>
        </div>

        <button type="submit">Log in</button>
      </form>

      <div className="form-section">
        <p>Don't have an account? <a href="/Sign up">Sign up</a></p>
      </div>
    </div>
    </div>
  );
};

export default Login;
