import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PostDetailPage.css';
import HeartIcon from '../assets/Heart.svg';
import CommentIcon from '../assets/Comment.svg';
import { fetchCommunityPostById, updateCommunityPost } from '../api/community';

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // 초기 데이터 로딩 로직 해당 id의 글을 가져온다.
  useEffect(() => {
    fetchCommunityPostById(id).then(data => {
      setPost(data);
      setComments(data.comments || []);
    });
  }, [id]);

  const handleLike = () => {
    if (!liked) {
      const updatedPost = { ...post, likes: (post.likes || 0) + 1 };
      updatePost(updatedPost);
      setLiked(true);
    }
  };

  const handleAddComment = () => {
    if (newComment.trim() === '') return;
    const updatedComments = [...comments, newComment];
    const updatedPost = { ...post, comments: updatedComments };
    updatePost(updatedPost);
    setComments(updatedComments);
    setNewComment('');
  };

  const handleDeleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    const updatedPost = { ...post, comments: updatedComments };
    updatePost(updatedPost);
    setComments(updatedComments);
  };

  const updatePost = async (updatedPost) => {
    const savedPost = await updateCommunityPost(updatedPost);
    setPost(savedPost);
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="post-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      <div className="post-box">
        <h2 className="post-title">{post.title}</h2>
        <div className="post-content-box">
          <p className="post-content">{post.content}</p>
          <span className="post-time">{post.date}</span>
        </div>
        <div className="post-actions">
          <div className="like-section" onClick={handleLike}>
            <img src={HeartIcon} alt="Like" className="icon" />
            <span>{post.likes || 0}</span>
          </div>
          <div className="comment-section">
            <img src={CommentIcon} alt="Comment" className="icon" />
            <span>{comments.length}</span>
          </div>
        </div>
      </div>

      <div className="comments-section">
        <h3>Comments</h3>
        {comments.map((c, index) => (
          <div key={index} className="comment-item">
            <span>{c}</span>
            <button className="delete-comment-button" onClick={() => handleDeleteComment(index)}>Delete</button>
          </div>
        ))}
      </div>

      <div className="add-comment-section">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
        />
        <button className="post-comment-button" onClick={handleAddComment}>Post</button>
      </div>
    </div>
  );
};

export default PostDetailPage;