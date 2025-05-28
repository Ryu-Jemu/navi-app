import React from 'react';
import './BottomNav.css';
import { NavLink } from 'react-router-dom';
import CommunityIcon from '../assets/Community.svg';
import ChatIcon from '../assets/AIChat.svg';
import HomeIcon from '../assets/Home.svg';
import CalendarIcon from '../assets/Calendar.svg';
import MoreIcon from '../assets/More.svg';

const BottomNav = () => {
  return (
    <div className="bottom-nav">
      <NavLink to="/community" className="nav-item">
        <img src={CommunityIcon} alt="Board" />
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