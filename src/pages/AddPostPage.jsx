import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddPostPage.css';
import closeIcon from '../assets/X.svg';
import cameraIcon from '../assets/Photo.svg';
import { createCommunityBoard, addCommunityPost } from '../api/community';

const AddPostPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAnon, setIsAnon] = useState(false);

  const handlePost = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Please enter both title and content.');
      return;
    }

    try {
      // 게시판 생성
      const newBoard = await createCommunityBoard({
        name: `Board for ${title}`,
        description: 'Auto-created for post',
      });

      const newPost = {
        title,
        content,
        board: newBoard.id,
      };

      await addCommunityPost(newPost);
      navigate('/community');
    } catch (err) {
      console.error('Failed to post:', err);
      alert('Failed to post. Please try again later.');
    }
  };

  return (
    <div className="addpost-container">
      <div className="addpost-header">
        <img
          src={closeIcon}
          alt="Close"
          className="close-icon"
          onClick={() => navigate('/community')}
        />
        <h2 className="addpost-title">Add Post</h2>
      </div>

      <input
        className="addpost-input"
        type="text"
        placeholder="Write title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="textarea-wrapper">
        <textarea
          className="addpost-textarea"
          placeholder="Share anything on your mind..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <img src={cameraIcon} alt="Camera" className="camera-icon" />
      </div>

      <div className="addpost-options">
        <label className="anon-label">
          <input
            type="checkbox"
            checked={isAnon}
            onChange={(e) => setIsAnon(e.target.checked)}
          />
          Anon
        </label>
      </div>

      <button className="addpost-button" onClick={handlePost}>
        POST
      </button>
    </div>
  );
};

export default AddPostPage;