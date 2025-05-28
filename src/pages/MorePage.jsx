import React from 'react';
import './MorePage.css';
import LogoIcon from '../assets/logo.svg';
import ProfileIcon from '../assets/Profile.svg';

const menuItems = [
  { title: 'Korean Daily Quiz', onClick: () => alert('Navigating to quiz!') },
  { title: 'Find a Mentor', onClick: () => alert('Navigating to mentor search!') },
  { title: 'Explore Nearby Restaurants', onClick: () => alert('Navigating to restaurant search!') },
  { title: 'International Student Community', onClick: () => alert('Navigating to community!') },
  { title: 'VISA Application', onClick: () => alert('Navigating to VISA application!') },
  { title: 'USIM Application', onClick: () => alert('Navigating to USIM application!') },
];

const MorePage = () => {
  return (
    <div className="more-page">
      <header className="more-header">
        <img src={LogoIcon} alt="Logo" className="logo" />

        <div className="profile-row">
          <div className="profile-left">
            <img src={ProfileIcon} alt="Profile" className="profile-icon" />
            <span className="nickname">Your Nickname</span>
          </div>
          <button className="logout-button" onClick={() => alert('Logging out...')}>
            Log Out
          </button>
        </div>
      </header>

      <div className="menu-list">
        {menuItems.map((item, index) => (
          <div key={index} className="menu-item" onClick={item.onClick}>
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MorePage;