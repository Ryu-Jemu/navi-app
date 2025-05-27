import React, { useState } from 'react';
import './FindPage.css';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assets/logo.png';
import { findPassword } from '../api/auth';

const FindPage = () => {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');

  const handleFindPassword = async (e) => {
    e.preventDefault();
    try {
      const result = await findPassword({ studentId, email });
      if (result.success) {
        alert('Temporary password has been sent to your email.');
        setTimeout(() => navigate('/login'));
      } else {
        alert('Failed to find password: ' + result.message);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred while trying to find the password.');
    }
  };

  return (
    <div className="find-container">
      <img src={logoImage} alt="Navi Logo" className="find-logo-img" />

      <div className="find-wrapper">
        <h2 className="find-title">Find Password</h2>

        <div className="find-box">
          <form className="find-form" onSubmit={handleFindPassword}>
            <label>Student ID</label>
            <input type="text" placeholder="10-digit number" value={studentId} onChange={(e) => setStudentId(e.target.value)} />

            <label>E-mail</label>
            <input type="email" placeholder="@hanyang.ac.kr" value={email} onChange={(e) => setEmail(e.target.value)} />

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