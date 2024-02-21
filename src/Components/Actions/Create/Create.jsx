import React, { useState } from 'react';

export default function Create() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handlePost = async () => {
    const article = {
      title: title, // Fixed typo
      content: content,
    };
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
        setTitle(''); // Reset form fields
        setContent('');
      } else {
        const errorText = await response.text(); // Or response.json() if the server returns JSON
        console.error('Failed to post the article:', errorText);
        alert('Failed to post the article. Please try again later.');
      }
    } catch (error) {
      console.error('Error posting the article:', error);
      alert('Error posting the article. Please try again later.');
    }
  };

  return (
    <div className="article-form">
      <input
        type="text"
        placeholder="Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Write here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="10"
      ></textarea>
      <button onClick={handlePost}>Post</button>
    </div>
  );
}
