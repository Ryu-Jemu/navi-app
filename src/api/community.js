import { getAuthHeader } from '../utils/token';

const API_URL = 'http://127.0.0.1:8000/api';

export const addCommunityPost = async (postData) => {
  const res = await fetch(`${API_URL}/community/posts/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(postData),
  });

  if (!res.ok) {
    throw new Error('Failed to add post');
  }

  return await res.json();
};


/**
 * 커뮤니티 게시글 전체 조회
 */
export async function fetchCommunityPosts() {
  const res = await fetch(`${API_URL}/community/boards/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
}

/**
 * 특정 게시글 삭제
 * @param {string} id - 삭제할 게시글 ID
 * 인증 절차가 있는지? -> getAuthHeader
 */
export async function deleteCommunityPost(id) {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...getAuthHeader(),
    },
  });
  if (!res.ok) {
    throw new Error('Failed to delete post');
  }
}
/**
 * 커뮤니티 특정 게시글 (id) 조회, 댓글 포함해서 fetch 댓글은 따로 fetch
 */
export async function fetchCommunityPostById(postId) {
  const res = await fetch(`${API_URL}/community/posts/${postId}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });

  if (!res.ok) throw new Error('Failed to fetch post');
  return res.json();
}
/**
 * getAuthHeader 댓글 쓰기 인증 필요
 */
export async function updateCommunityPost(post) {
  const res = await fetch(`${API_URL}/community/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error('Failed to update post');
  return res.json();
}

/**
 * 게시글 좋아요 추가/취소
 * @param {string} postId - 게시글 ID
 */
export async function toggleCommunityPostLike(postId) {
  const res = await fetch(`${API_URL}/community/posts/${postId}/like/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error || '좋아요 처리 실패');
  }

  return result.message;
}

// 댓글 작성
export async function addCommentToPost(postId, content) {
  const res = await fetch(`${API_URL}/community/posts/${postId}/add_comment/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || '댓글 작성 실패');
  }

  return await res.json(); // 필요 시 댓글 객체 반환
}

/**
 * 특정 게시글의 댓글 목록 조회
 * @param {string} postId - 게시글 ID
 */
export async function fetchCommentsByPostId(postId) {
  const res = await fetch(`${API_URL}/community/comments/?post=${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });

  if (!res.ok) {
    throw new Error('댓글 목록 조회 실패');
  }

  return await res.json(); // 댓글 배열 반환
}

/**
 * 댓글 삭제
 * @param {string} commentId - 삭제할 댓글 ID
 */
export async function deleteComment(commentId) {
  const res = await fetch(`${API_URL}/community/comments/${commentId}/`, {
    method: 'DELETE',
    headers: {
      ...getAuthHeader(),
    },
  });

  if (!res.ok) {
    throw new Error('댓글 삭제 실패');
  }
}

/**
 * 게시판 생성 (관리자 전용)
 * @param {Object} boardData - 생성할 게시판 데이터
 * @param {string} boardData.name - 게시판 이름
 * @param {string} boardData.description - 게시판 설명
 */
export async function createCommunityBoard(boardData) {
  const res = await fetch(`${API_URL}/community/boards/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(boardData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || '게시판 생성 실패');
  }

  return await res.json();
}