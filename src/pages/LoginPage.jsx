import React from 'react';
import './LoginPage.css';

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
        <a href="#">Find Password</a>
        <span>|</span>
        <a href="#">Sign up</a>
    </div>
    </div>
  );
};

export default LoginPage;