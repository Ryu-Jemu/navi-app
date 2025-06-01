import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PostDetailPage.css';
import HeartIcon from '../assets/Heart.svg';
import CommentIcon from '../assets/Comment.svg';
import { fetchCommunityPostById, toggleCommunityPostLike, addCommentToPost, fetchCommentsByPostId, deleteComment } from '../api/community';

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // 초기 데이터 로딩 로직 해당 id의 글을 가져온다.
  useEffect(() => {
    const fetchData = async () => {
      // 게시글과 댓글을 rendering
      const postData = await fetchCommunityPostById(id);
      const commentData = await fetchCommentsByPostId(id);
      setPost(postData);
      setComments(commentData);
    };
    fetchData();
  }, [id]);

  const handleLike = async () => {
    try {
      const message = await toggleCommunityPostLike(id);
      // 좋아요 수정하면 reload
      const updatedPost = await fetchCommunityPostById(id);
      setPost(updatedPost);
      setLiked(!liked);
      console.log(message); // 또는 alert(message)
    } catch (err) {
      console.error('좋아요 처리 실패:', err.message);
    }
  };

  // 댓글 따로 분리
  const handleAddComment = async () => {
    if (newComment.trim() === '') return;
    try {
      await addCommentToPost(id, newComment);
      // 댓글 추가하면 reload
      const updatedComments = await fetchCommentsByPostId(id);
      setComments(updatedComments);
      setNewComment('');
    } catch (err) {
      console.error('댓글 작성 실패:', err.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      // 삭제하면 reload
      const updatedComments = await fetchCommentsByPostId(id);
      setComments(updatedComments);
    } catch (err) {
      console.error('댓글 삭제 실패:', err.message);
    }
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
        {comments.map((c) => (
          <div key={c.id} className="comment-item">
            <span>{c.content}</span>
            <button className="delete-comment-button" onClick={() => handleDeleteComment(c.id)}>Delete</button>
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