import React from 'react';
import './MainPage.css';
import BottomNav from '../BottomNav/BottomNav';
import logoImage from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

const Main_Page = () => {
  const navigate = useNavigate();
  
  const navigate = useNavigate();
  return (
    <div className="main-page">
      <header className="header">
      <img
        src={logoImage}
        alt="Navi Logo"
        className="logo"
        onClick={() => navigate('/')} // 클릭 시 /로 이동
        style={{ cursor: 'pointer' }}  // 클릭 가능한 커서 모양
/>     
        </header>

      <h2 className="section-title">AI Chat</h2> {/* 변경된 위치 */}

      <section className="chat-box">
        <div className="chat-heading">📮 Need help with something?</div>
        <ul className="chat-questions">
          <li>📩 How do I extend my visa?</li>
          <li>📩 How do I open a bank account?</li>
        </ul>
        <button className="chat-button" onClick={() => navigate('/chat')}>
          Tap to start chatting with Navi</button>
      </section>

      <h3 className="section-title">To do List</h3> {/* box 밖으로 이동 */}

      <section className="todo-wrapper">
        <div className="todo-cards">
          <div className="card">
            <div className="date">May 20</div>
            <div className="time">13:00 Contents<br />15:00 Storytelling</div>
          </div>
          <div className="card">
            <div className="date">May 30</div>
            <div className="time">⭐ Extend visa</div>
          </div>
        </div>
      </section>

      <h3 className="section-title">Community</h3>

      <section className="community-section">
        <div className="community-placeholder">
          {/* 커뮤니티 내용 자리 */}
        </div>
      </section>

      <BottomNav />
    </div>
  );
};

export default Main_Page;