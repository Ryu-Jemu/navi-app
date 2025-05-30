import { fetchCommunityPosts, deleteCommunityPost } from '../api/community';
import { useState, useRef, useEffect } from 'react';
/**
 * 명시적 정의
 * @typedef {Object} Post
 * @property {number} id - 고유 게시글 ID
 * @property {string} title - 게시글 제목
 * @property {string} content - 게시글 본문
 * @property {boolean} isAnon - 익명 여부
 * @property {string} date - 작성 날짜 (ISO 형식)
 * @property {number} [likes] - 좋아요 수
 * @property {string[]} [comments] - 댓글 목록
 */
import { useNavigate } from 'react-router-dom';
import './CommunityPage.css';
import BottomNav from '../BottomNav/BottomNav';
import logoImage from '../assets/logo.svg';
import ProfileIcon from '../assets/Profile.svg';
import AnonIcon from '../assets/Anon.svg';
import HeartIcon from '../assets/Heart.svg';
import CommentIcon from '../assets/Comment.svg';
import { clearToken } from '../utils/token'

const CommunityPage = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('Trend');
  /** @type {[Post[], Function]} */
  const [posts, setPosts] = useState([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    fetchCommunityPosts().then(setPosts);

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
    const handleFilterClick = (filter) => {
      if (filter === 'Log-Out') {
        // token을 반납한다.
        clearToken();
        navigate('/login');
      }
      setShowProfileMenu(false);
    };

  const filteredPosts =
    selectedTab === 'My Post'
      ? posts.filter(post => !post.isAnon)
      : posts;
  // 지우는 ui 아직 없음
  const handleDelete = async (id) => {
    await deleteCommunityPost(id);
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  return (
    <div className="community-container">
      <div className="community-content">
        <header className="community-header">
          <div className="header-left">
            <img src={logoImage} alt="Logo" className="community-logo" />
            <h1 className="community-title">Community</h1>
          </div>
          <div className="header-right">
          <div className="profile-container" ref={profileRef}>
            <img
              src={ProfileIcon}
              alt="Profile"
              className="icon profile"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            />
            {showProfileMenu && (
              <div className="popup-logout">
                <div className="popup-item" onClick={() => handleFilterClick('Log-Out')}>
                  Log-Out
                </div>
              </div>
            )}
          </div>
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
                  <div className="post-user">
                    <img src={AnonIcon} alt="Anon" className="checkuser" />
                    <span>{post.isAnon ? 'Anon' : 'User'}</span>
                  </div>
                  <div className="post-date">{post.date}</div>
                </div>
                <h3 className="post-title">{post.title}</h3>
                <p className="post-content">{post.content}</p>
                <div className="post-stats">
                  <div className="stat-item">
                    <img src={HeartIcon} alt="Likes" className="stat-icon" />
                    <span>{post.likes || 0}</span>
                  </div>
                  <div className="stat-item">
                    <img src={CommentIcon} alt="Comments" className="stat-icon" />
                    <span>{post.comments ? post.comments.length : 0}</span>
                  </div>
                </div>
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