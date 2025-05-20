import React from 'react';
import './LoginPage.css';
import { Link } from 'react-router-dom';
import logoImage from '../assets/logo.png'; 

const LoginPage = () => {
  return (
    <div className="login-container">
      <img src={logoImage} alt="Navi Logo" className="login-logo-img" />

      <div className="login-wrapper">
        <h2 className="login-title">Log-In</h2>

        <form className="login-form">
          <label htmlFor="student-id">Student ID</label>
          <input id="student-id" type="text" placeholder="10-digit number" />

          <label htmlFor="password">Password</label>
          <input id="password" type="password" placeholder="Password" />

          <button type="submit" className="login-button">Sign In</button>
        </form>
      </div>

      <div className="login-links">
        <Link to="/find">Find Password</Link>
        <span> | </span>
        <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
};

export default LoginPage;