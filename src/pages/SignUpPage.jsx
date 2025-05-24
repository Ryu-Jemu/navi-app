import React from 'react';
import './SignUpPage.css';
import logoImage from '../assets/logo.png'; // 로고 이미지 경로는 실제 위치에 맞게 조정
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/auth';

const SignUpPage = () => {
  const [name, setName] = React.useState('');
  const [nickname, setNickname] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [studentId, setStudentId] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [checkPassword, setCheckPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // 새로고침 방지
    e.preventDefault();
    // 비밀번호 확인
    if (password !== checkPassword) {
      alert('Passwords do not match.');
      return;
    }
    // 에메일 형식 확인
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      const result = await signup({ name, nickname, country, studentId, password, email });
      if (result.success) {
        alert('Signup successful. Please log in.');
        navigate('/sign-in');
      } else {
        alert('Signup failed: ' + result.message);
      }
    } catch (err) {
      console.error('Signup error:', err);
      alert('An error occurred during signup.');
    }
  };

  return (
    <div className="signup-container">
      <img src={logoImage} alt="Navi Logo" className="signup-logo-img" />

      <form className="signup-form" onSubmit={handleSubmit}>
        <label>Student Name</label>
        <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Nickname</label>
        <div className="input-wrapper">
          <input type="text" placeholder="Enter a nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        </div>

        <label>Country</label>
        <div className="input-wrapper">
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            <option>China</option>
            <option>Germany</option>
            <option>USA</option>
            <option>Korea</option>
          </select>
        </div>

        <label>Student ID</label>
        <div className="input-wrapper">
          <input type="text" placeholder="10-digit number" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
        </div>

        <label>Password</label>
        <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <label>Check Password</label>
        <input type="password" placeholder="Re-enter password" value={checkPassword} onChange={(e) => setCheckPassword(e.target.value)} />

        <label>E-mail</label>
        <input type="email" placeholder="@hanyang.ac.kr" value={email} onChange={(e) => setEmail(e.target.value)} />

        <button type="submit">Finish</button>
      </form>
    </div>
  );
};

export default SignUpPage;