import React, { useEffect, useState } from "react";
import { getUsers, getPostsByUser, getCommentsByPost } from "../api/api";

const TrendingPosts = () => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      const { users } = await getUsers();
      const postCommentMap = [];

      for (const id of Object.keys(users)) {
        const { posts } = await getPostsByUser(id);

        for (const post of posts) {
          const { comments } = await getCommentsByPost(post.id);
          postCommentMap.push({
            ...post,
            commentCount: comments.length,
          });
        }
      }

      const maxCount = Math.max(...postCommentMap.map(p => p.commentCount));
      const trendingPosts = postCommentMap.filter(p => p.commentCount === maxCount);
      setTrending(trendingPosts);
    };

    fetchTrending();
  }, []);

  return (
    <div className="card">
      <h2>Trending Posts</h2>
      {trending.map((post) => (
        <div key={post.id}>
          <p>{post.content}</p>
          <small>{post.commentCount} comments</small>
        </div>
      ))}
    </div>
  );
};

export default TrendingPosts;
