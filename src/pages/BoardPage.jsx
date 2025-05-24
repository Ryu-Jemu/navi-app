import React from 'react';
import './BoardPage.css';
import BottomNav from '../BottomNav/BottomNav';
import LogoImage from '../assets/logo.png';
import SearchIcon from '../assets/Search_Icon.png';
import ProfileIcon from '../assets/Profile_Icon.png';
import FileImage from '../assets/File_Icon.png';


const BoardPage = () => {
  return (
    <div className="board-page">
      <header className="board-header">
        <img src={LogoImage} alt="Logo" className="logo" />
        <div className="header-icons">
          <img src={SearchIcon} alt="Search" />
          <img src={ProfileIcon} alt="Profile" />
        </div>
      </header>

      <h2 className="board-title">Community</h2>

      <div className="language-tabs">
        <span className="tab active">English</span>
        <span className="tab">Chinese</span>
      </div>

      <div className="board-menu">
        <div className="menu-item">
          <img src={FileImage} alt="My Posts" />
          <span>My Posts</span>
        </div>
        <div className="menu-item">
          <img src={FileImage} alt="Commented" />
          <span>Commented</span>
        </div>
        <div className="menu-item">
          <img src={FileImage} alt="Scrap" />
          <span>Scrap</span>
        </div>
        <div className="menu-item">
          <img src={FileImage} alt="Free Board" />
          <span>Free Board</span>
        </div>
      </div>

      <button className="add-post-button">Add Post</button>
      <BottomNav />
    </div>
  );
};

export default BoardPage;