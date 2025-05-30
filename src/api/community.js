import { getAuthHeader } from '../utils/token';

const API_URL = 'http://localhost:3000/api';

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
  const res = await fetch(`${API_URL}/posts`);
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