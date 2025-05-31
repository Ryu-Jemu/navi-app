import React, { useState } from 'react';
import './FindPage.css';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assets/logo.svg';
import { findPassword } from '../api/auth';

const FindPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleFindPassword = async (e) => {
    e.preventDefault();
    try {
      const result = await findPassword({ username, email });
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
            <label>Username</label>
            <input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />

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