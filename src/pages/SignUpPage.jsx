import React from 'react';
import './SignUpPage.css';

const SignUpPage = () => {
  return (
    <div className="signup-container">
      <h1 className="signup-logo">Navi</h1>

      <form className="signup-form">
        <label>Student Name</label>
        <input type="text" placeholder="Enter your name" />

        <label>Nickname</label>
        <input type="text" placeholder="Enter a nickname" />

        <label>Country</label>
        <select>
          <option>China</option>
          <option>Germany</option>
          <option>USA</option>
          <option>Korea</option>
        </select>

        <label>Student ID</label>
        <input type="text" placeholder="10-digit number" />

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