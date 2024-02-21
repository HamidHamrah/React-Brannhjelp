import React, { useState, useEffect } from 'react';

export default function Update({ articleId, userId }) {
  const [article, setArticle] = useState(null);
  const [userName, setUserName] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`https://localhost:7207/api/Publications/${articleId}?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setArticle(data);
          setContent(data.content); // Assuming content is part of the fetched article
        } else {
          console.error('Failed to fetch the article:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching the article:', error);
      }
    };

    fetchArticle();
  }, [articleId, userId]);

  const handleUpdate = async () => {
    const updatedArticle = {
      ...article,
      content: content,
      userName: userName,
    };

    try {
      const response = await fetch(`https://localhost:7207/api/Publications/${articleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedArticle),
      });
      if (response.ok) {
        alert('Article updated successfully!');
        // Handle redirection or any other necessary action after successful update
      } else {
        const errorText = await response.text();
        console.error('Failed to update the article:', errorText);
        alert('Failed to update the article. Please try again later.');
      }
    } catch (error) {
      console.error('Error updating the article:', error);
      alert('Error updating the article. Please try again later.');
    }
  };

  return (
    <div className="article-form">
      <input
        type="text"
        placeholder="User Name..."
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <textarea
        placeholder="Write here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="10"
      ></textarea>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}
