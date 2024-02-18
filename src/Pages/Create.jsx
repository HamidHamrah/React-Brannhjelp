import React, { useState } from 'react';
import NavBar from "../Components/Navbar/Navbar";

export default function CreateArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handlePost = async () => {
    const article = { title, content };
    try {
      const response = await fetch('https://localhost:7207/api/publications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(article),
      });
      if (response.ok) {
        alert('Article posted successfully!');
        // Reset form or redirect user as needed
      } else {
        alert('Failed to post the article.');
      }
    } catch (error) {
      console.error('Error posting the article:', error);
      alert('Error posting the article.');
    }
  };

  return (
    <div>
      <NavBar />
      <div className="article-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Write your article here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="10"
        ></textarea>
        <button onClick={handlePost}>Post</button>
      </div>
    </div>
  );
}
