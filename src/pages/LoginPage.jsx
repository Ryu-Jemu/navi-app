import React from 'react';
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../assets/logo.png';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    navigate('/onboarding'); 
  };

  return (
    <div className="login-container">
      <img src={logoImage} alt="Navi Logo" className="login-logo-img" />

      <div className="login-wrapper">
        <h2 className="login-title">Log-In</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="student-id">Student ID</label>
          <input id="student-id" type="text" placeholder="10-digit number" required />

          <label htmlFor="password">Password</label>
          <input id="password" type="password" placeholder="Password" required />

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