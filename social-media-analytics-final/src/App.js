import React from 'react';
import TopUsers from './components/TopUsers';
import TrendingPosts from './components/TrendingPosts';
import Feed from './components/Feed';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1 className="header">Social Media Analytics</h1>
      <TopUsers />
      <TrendingPosts />
      <Feed />
    </div>
  );
}

export default App;
