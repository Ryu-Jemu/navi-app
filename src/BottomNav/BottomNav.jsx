import React from 'react';
import './BottomNav.css';

import BoardIcon from '../assets/Board_Icon.png';
import ChatIcon from '../assets/Chat_Icon.png';
import CalendarIcon from '../assets/Calendar_Icon.png';
import MoreIcon from '../assets/More_Icon.png';
import logo from '../assets/logo.png'; // 홈 아이콘 대체

const BottomNav = () => {
  return (
    <div className="bottom-nav">
      <button className="nav-item">
        <img src={BoardIcon} alt="Board" />
        <span>BOARD</span>
      </button>
      <button className="nav-item">
        <img src={ChatIcon} alt="Chat" />
        <span>AI CHAT</span>
      </button>
      <button className="nav-item home">
        <img src={logo} alt="Home" />
        <span>HOME</span>
      </button>
      <button className="nav-item">
        <img src={CalendarIcon} alt="Calendar" />
        <span>CALENDAR</span>
      </button>
      <button className="nav-item">
        <img src={MoreIcon} alt="More" />
        <span>MORE</span>
      </button>
    </div>
  );
};

export default BottomNav;