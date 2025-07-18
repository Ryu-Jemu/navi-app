import React, { useEffect, useState } from 'react';
import './MainPage.css';
import BottomNav from '../BottomNav/BottomNav';
import logoImage from '../assets/logo.svg';
import HeartIcon from '../assets/Heart.svg';
import CommentIcon from '../assets/Comment.svg'
import { useNavigate } from 'react-router-dom';
import { fetchCommunityPosts } from '../api/community';

const Main_Page = () => {
  const navigate = useNavigate();
  const [latestPosts, setLatestPosts] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);

  useEffect(() => {
    // 커뮤니티 인기 글 2개
    fetchCommunityPosts().then((data) => {
      const hottestPosts = data
        .sort((a, b) => b.likes - a.likes)
        .slice(0, 2);
      setLatestPosts(hottestPosts);
    });

    // 오늘 기준 앞으로 할 일 3개
    const today = new Date();
    const storedTasks = JSON.parse(localStorage.getItem('futureTasks')) || [];

    const filteredTasks = storedTasks
      .filter(task => new Date(task.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3);

    setUpcomingTasks(filteredTasks);
  }, []);

  return (
    <div className="main-page">
      <header className="header">
        <img
          src={logoImage}
          alt="Navi Logo"
          className="logo"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        />
      </header>

      <h2 className="section-title">AI Chat</h2>

      <section className="chat-box">
        <div className="chat-heading">📮 Need help with something?</div>
        <ul className="chat-questions">
          <li>📩 How do I extend my visa?</li>
          <li>📩 How do I open a bank account?</li>
        </ul>
        <button className="chat-button" onClick={() => navigate('/chat')}>
          Tap to start chatting with Navi
        </button>
      </section>

      <div className="section-header">
        <h3 className="section-title">To do List</h3>
        <button className="more-button" onClick={() => navigate('/calendar')}>
          more &gt;
          </button>
      </div>

      <section className="todo-wrapper">
        <div className="todo-cards">
          {upcomingTasks.length === 0 ? (
            <p className="no-posts">No upcoming tasks.</p>
          ) : (
            upcomingTasks.map((task, idx) => (
              <div key={idx} className="card">
                <div className="date">{task.date}</div>
                <div className="time">{task.task}</div>
              </div>
            ))
          )}
        </div>
      </section>

      <div className="section-header">
        <h3 className="section-title">What's hot today?</h3>
        <button className="more-button" onClick={() => navigate('/community')}>more &gt;</button>
      </div>

      <section className="community-section">
        {latestPosts.length === 0 ? (
          <p className="no-posts">No posts available.</p>
        ) : (
          latestPosts.map(post => (
            <div
              key={post.id}
              className="hot-post-card"
              onClick={() => navigate(`/post/${post.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <h4 className="hot-post-title">{post.title}</h4>
              <div className="hot-post-content-box">
                <p className="hot-post-content">
                  {post.content.length > 50 ? `${post.content.slice(0, 50)}...` : post.content}
                </p>
              </div>
              <div className="hot-post-stats">
                <span className="stat">
                  <img src={HeartIcon} alt="Like" />{post.likes || 0}
                </span>
                <span className="stat">
                <img src={CommentIcon} alt="comments" />{post.comments ? post.comments.length : 0}
                </span>
              </div>
            </div>
          ))
        )}
      </section>

      <BottomNav />
    </div>
  );
};

export default Main_Page;