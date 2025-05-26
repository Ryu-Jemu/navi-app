import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CommunityPage.css';
import BottomNav from '../BottomNav/BottomNav';
import logoImage from '../assets/logo.png';
import profileIcon from '../assets/Profile_Icon.png';

const CommunityPage = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('Trend');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('communityPosts')) || [];
    setPosts(storedPosts);
  }, []);

  // eslint-disable-next-line
  const handleDelete = (id) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem('communityPosts', JSON.stringify(updatedPosts));
  };

  const filteredPosts =
    selectedTab === 'My Post'
      ? posts.filter(post => !post.isAnon)
      : posts;

  return (
    <div className="community-container">
      <div className="community-content">
        <header className="community-header">
          <div className="header-left">
            <img src={logoImage} alt="Logo" className="community-logo" />
            <h1 className="community-title">Community</h1>
          </div>
          <div className="header-right">
            <img src={profileIcon} alt="Profile" className="profile-icon" />
            <button className="add-post-button" onClick={() => navigate('/addpost')}>
              Add Post
            </button>
          </div>
        </header>

        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>

        <div className="ad-banner">
          <strong>Advertisement</strong>
        </div>

        <nav className="tab-menu">
          {['Trend', 'New', 'My Post', 'Scrap'].map(tab => (
            <button
              key={tab}
              className={`tab-button ${selectedTab === tab ? 'active' : ''}`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="post-list">
          {filteredPosts.length === 0 ? (
            <p className="no-posts">No posts available.</p>
          ) : (
            filteredPosts.map(post => (
              <div
                key={post.id}
                className="post-card"
                onClick={() => navigate(`/post/${post.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="post-header">
                  <span>{post.isAnon ? 'Anon' : 'User'}</span>
                </div>
                <h3 className="post-title">{post.title}</h3>
                <p className="post-content">{post.content}</p>
                <span className="post-footer">{post.date}</span>
              </div>
            ))
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default CommunityPage;