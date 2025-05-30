import React from 'react';
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../assets/logo.svg';
import { login } from '../api/auth';
import { saveToken } from '../utils/token'

const LoginPage = () => {
  const navigate = useNavigate();
  const [studentId, setStudentId] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (e) => {
      // 새로고침 막음
    e.preventDefault();
    try {
      const result = await login({ studentId, password });
      if (result.success) {
        // 인증에 성공하면 서버에서 token을 발급받아서 local에 저장
        saveToken(result.token);
        navigate('/main');
      } else {
        alert('Login failed: ' + result.message);
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('An error occurred during login.');
    }
  };

  return (
    <div className="login-container">
      <img src={logoImage} alt="Navi Logo" className="login-logo-img" />

      <div className="login-wrapper">
        <h2 className="login-title">Log-In</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="student-id">Student ID</label>
          <input id="student-id" type="text" placeholder="10-digit number" required
                 value={studentId} onChange={(e) => setStudentId(e.target.value)} />

          <label htmlFor="password">Password</label>
          <input id="password" type="password" placeholder="Password" required
                 value={password} onChange={(e) => setPassword(e.target.value)} />

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