import React from 'react';
import './SignUpPage.css';
import logoImage from '../assets/logo.png'; 

const SignUpPage = () => {
  return (
    <div className="signup-container">
      <img src={logoImage} alt="Navi Logo" className="signup-logo-img" />

      <form className="signup-form">
        <label>Student Name</label>
        <input type="text" placeholder="Enter your name" />

        <label>Nickname</label>
        <div className="input-wrapper">
          <input type="text" placeholder="Enter a nickname" />
        </div>

        <label>Country</label>
        <div className="input-wrapper">
          <select>
            <option>China</option>
            <option>Germany</option>
            <option>USA</option>
            <option>Korea</option>
          </select>
        </div>

        <label>Student ID</label>
        <div className="input-wrapper">
          <input type="text" placeholder="10-digit number" />
        </div>

        <label>Password</label>
        <input type="password" placeholder="Enter password" />

        <label>Check Password</label>
        <input type="password" placeholder="Re-enter password" />

        <label>E-mail</label>
        <input type="email" placeholder="@hanyang.ac.kr" />

        <button type="submit">Finish</button>
      </form>
    </div>
  );
};

export default SignUpPage;