
const API_URL = 'http://localhost:3000/api';

export const addCommunityPost = async (postData) => {
  const res = await fetch(`${API_URL}/community`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });

  if (!res.ok) {
    throw new Error('Failed to add post');
  }

  return await res.json();
};