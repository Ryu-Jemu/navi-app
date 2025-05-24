import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BoardPage.css';
import BottomNav from '../BottomNav/BottomNav';
import LogoImage from '../assets/logo.png';
import SearchIcon from '../assets/Search_Icon.png';
import ProfileIcon from '../assets/Profile_Icon.png';
import FileImage from '../assets/File_Icon.png';

const BoardPage = () => {
  const [language, setLanguage] = useState('English');
  const navigate = useNavigate();

  const menuItems = {
    English: ['My Posts', 'Commented', 'Scrap', 'Free Board'],
    Chinese: ['我的帖子', '评论过的', '收藏', '自由板块'],
  };

  return (
    <div className="board-page">
      <header className="board-header">
        <img src={LogoImage} alt="Logo" className="logo" />
        <div className="header-icons">
          <img src={SearchIcon} alt="Search" />
          <img src={ProfileIcon} alt="Profile" />
        </div>
      </header>

      <h2 className="board-title">
        {language === 'English' ? 'Community' : '社区'}
      </h2>

      <div className="language-tabs">
        <span
          className={`tab ${language === 'English' ? 'active' : ''}`}
          onClick={() => setLanguage('English')}
        >
          English
        </span>
        <span
          className={`tab ${language === 'Chinese' ? 'active' : ''}`}
          onClick={() => setLanguage('Chinese')}
        >
          Chinese
        </span>
      </div>

      <div className="board-menu">
        {menuItems[language].map((item, index) => (
          <div className="menu-item" key={index}>
            <img src={FileImage} alt={item} />
            <span>{item}</span>
          </div>
        ))}
      </div>

      <button
        className="add-post-button"
        onClick={() => navigate('/addpost')}
      >
        {language === 'English' ? 'Add Post' : '添加帖子'}
      </button>

      <BottomNav />
    </div>
  );
};

export default BoardPage;