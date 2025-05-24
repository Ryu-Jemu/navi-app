import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddPostPage.css';
import BottomNav from '../BottomNav/BottomNav';
import LogoImage from '../assets/logo.png';

const AddPostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Please fill in both title and content.');
      return;
    }
    // TODO: 서버 전송 or 상태 업데이트 추가
    console.log('Submitted Title:', title);
    console.log('Submitted Content:', content);
    alert('Post submitted successfully!');
    setTitle('');
    setContent('');
    navigate('/board'); // 제출 후 게시판으로 이동
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel?')) {
      navigate('/board');
    }
  };

  return (
    <div className="add-post-page">
      <header className="add-post-header">
        <img src={LogoImage} alt="Logo" className="logo" />
        <h2 className="header-title">Community</h2>
      </header>

      <form className="post-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="post-input"
          required
        />
        <textarea
          placeholder="Write your content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="post-textarea"
          required
        ></textarea>

        <div className="button-group">
          <button type="submit" className="submit-button">
            Submit Post
          </button>
          <button type="button" className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>

      <BottomNav />
    </div>
  );
};

export default AddPostPage;