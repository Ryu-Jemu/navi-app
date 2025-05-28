// BottomNav.jsx
import React from 'react';
import './BottomNav.css';
import { NavLink } from 'react-router-dom';
import { ReactComponent as CommunityIcon } from '../assets/Community.svg';
import { ReactComponent as ChatIcon } from '../assets/AIChat.svg';
import { ReactComponent as HomeIcon } from '../assets/Home.svg';
import { ReactComponent as CalendarIcon } from '../assets/Calendar.svg';
import { ReactComponent as MoreIcon } from '../assets/More.svg';

const BottomNav = () => {
  return (
    <div className="bottom-nav">
      <NavLink to="/community" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <CommunityIcon className="nav-icon" />
        <span>FEED</span>
      </NavLink>
      <NavLink to="/chat" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <ChatIcon className="nav-icon" />
        <span>AI CHAT</span>
      </NavLink>
      <NavLink to="/main" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <HomeIcon className="nav-icon" />
        <span>HOME</span>
      </NavLink>
      <NavLink to="/calendar" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <CalendarIcon className="nav-icon" />
        <span>CALENDAR</span>
      </NavLink>
      <NavLink to="/more" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <MoreIcon className="nav-icon" />
        <span>MORE</span>
      </NavLink>
    </div>
  );
};

export default BottomNav;
