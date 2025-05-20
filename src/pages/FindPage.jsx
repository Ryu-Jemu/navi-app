import React from 'react';
import './FindPage.css';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assets/logo.png';

const FindPage = () => {
  const navigate = useNavigate();

  return (
    <div className="find-container">
      <img src={logoImage} alt="Navi Logo" className="find-logo-img" />

      <div className="find-wrapper">
        <h2 className="find-title">Find Password</h2>

        <div className="find-box">
          <form className="find-form">
            <label>Student ID</label>
            <input type="text" placeholder="10-digit number" />

            <label>E-mail</label>
            <input type="email" placeholder="@hanyang.ac.kr" />

            <div className="find-buttons">
              <button type="button" onClick={() => navigate('/login')}>Back</button>
              <button type="submit">Find</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FindPage;