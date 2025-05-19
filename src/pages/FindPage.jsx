import React from 'react';
import './FindPage.css';
import { useNavigate } from 'react-router-dom';

const FindPage = () => {
  const navigate = useNavigate();

  return (
    <div className="find-container">
      <h1 className="find-logo">Navi</h1>
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
  );
};

export default FindPage;