const BASE_URL = "http://20.244.56.144/evaluation-service";
const ACCESS_CODE = "CNneGT";

const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${ACCESS_CODE}`
};

export const getUsers = async () => {
  const res = await fetch(`${BASE_URL}/users`, { headers });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

export const getPostsByUser = async (userId) => {
  const res = await fetch(`${BASE_URL}/users/${userId}/posts`, { headers });
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

export const getCommentsByPost = async (postId) => {
  const res = await fetch(`${BASE_URL}/posts/${postId}/comments`, { headers });
  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json();
};
