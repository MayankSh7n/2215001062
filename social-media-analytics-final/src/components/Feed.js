import React, { useEffect, useState } from "react";
import { getUsers, getPostsByUser } from "../api/api";

const Feed = () => {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      const { users } = await getUsers();
      let allPosts = [];

      for (const id of Object.keys(users)) {
        const { posts } = await getPostsByUser(id);
        allPosts.push(...posts);
      }

      allPosts.sort((a, b) => b.id - a.id); // Assuming higher ID = newer post
      setFeed(allPosts);
    };

    fetchFeed();
  }, []);

  return (
    <div className="card">
      <h2>Live Feed</h2>
      {feed.map((post) => (
        <div key={post.id}>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Feed;
