import React, { useEffect, useState } from "react";
import { getUsers, getPostsByUser, getCommentsByPost } from "../api/api";

const TopUsers = () => {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const fetchTopUsers = async () => {
      const { users } = await getUsers();
      const userCommentCounts = [];

      for (const [id, name] of Object.entries(users)) {
        const { posts } = await getPostsByUser(id);
        let totalComments = 0;

        for (const post of posts) {
          const { comments } = await getCommentsByPost(post.id);
          totalComments += comments.length;
        }

        userCommentCounts.push({ id, name, totalComments });
      }

      userCommentCounts.sort((a, b) => b.totalComments - a.totalComments);
      setTopUsers(userCommentCounts.slice(0, 5));
    };

    fetchTopUsers();
  }, []);

  return (
    <div className="card">
      <h2>Top Users</h2>
      <ul>
        {topUsers.map((user) => (
          <li key={user.id}>
            {user.name} - {user.totalComments} comments
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopUsers;
