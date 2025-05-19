import React from 'react';
import './LoginPage.css';
import { Link } from 'react-router-dom';


const LoginPage = () => {
  return (
    <div className="login-container">
    <h1 className="login-logo">Navi</h1>

    {/* 박스를 감싸는 wrapper */}
    <div className="login-wrapper">
        <h2 className="login-title">Log-In</h2>

        <div className="login-box">
        <form className="login-form">
            <label htmlFor="student-id">Student ID</label>
            <input id="student-id" type="text" placeholder="10-digit number" />

            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Password" />

            <button type="submit">Sign In</button>
        </form>
        </div>
    </div>

    <div className="login-links">
      <Link to="/find">Find Password</Link>
      <span>|</span>
      <Link to="/signup">Sign up</Link>
    </div>
    </div>
  );
};

export default LoginPage;