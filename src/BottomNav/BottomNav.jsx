import React from 'react';
import './BottomNav.css';
import { NavLink } from 'react-router-dom';
import BoardIcon from '../assets/Board_Icon.png';
import ChatIcon from '../assets/Chat_Icon.png';
import HomeIcon from '../assets/logo.png';
import CalendarIcon from '../assets/Calendar_Icon.png';
import MoreIcon from '../assets/More_Icon.png';

const BottomNav = () => {
  return (
    <div className="bottom-nav">
      <NavLink to="/community" className="nav-item">
        <img src={BoardIcon} alt="Board" />
        <span>COMMUNITY</span>
      </NavLink>
      <NavLink to="/chat" className="nav-item">
        <img src={ChatIcon} alt="Chat" />
        <span>AI CHAT</span>
      </NavLink>
      <NavLink to="/main" className="nav-item home">
        <img src={HomeIcon} alt="Home" />
        <span>HOME</span>
      </NavLink>
      <NavLink to="/calendar" className="nav-item">
        <img src={CalendarIcon} alt="Calendar" />
        <span>CALENDAR</span>
      </NavLink>
      <NavLink to="/more" className="nav-item">
        <img src={MoreIcon} alt="More" />
        <span>MORE</span>
      </NavLink>
    </div>
  );
};

export default BottomNav;