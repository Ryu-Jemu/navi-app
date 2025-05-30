import { getAuthHeader } from '../utils/token';

const API_URL = 'http://127.0.0.1:8000/api';

export const addCommunityPost = async (postData) => {
  const res = await fetch(`${API_URL}/community`, {
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
 * 커뮤니티 특정 게시글 (id) 조회, 댓글 포함해서 fetch
 */
export async function fetchCommunityPostById(id) {
  const res = await fetch(`${API_URL}/posts/${id}`);
  if (!res.ok) throw new Error('Failed to fetch post');
  return res.json();
}
/**
 * getAuthHeader 댓글 쓰기 인증 필요
 */
export async function updateCommunityPost(post) {
  const res = await fetch(`${API_URL}/posts/${post.id}`, {
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
