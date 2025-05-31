import React from 'react';
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../assets/logo.svg';
import { login } from '../api/auth';
import { saveToken } from '../utils/token'

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ username, password });
      if (result.access && result.refresh) {
        localStorage.setItem('access', result.access);
        localStorage.setItem('refresh', result.refresh);
        navigate('/main');
      } else {
        alert('Login failed: Invalid token response');
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
          <label htmlFor="username">Username</label>
          <input id="username" type="text" placeholder="Your username" required
                 value={username} onChange={(e) => setUsername(e.target.value)} />

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