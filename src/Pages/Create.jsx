import React, { useState } from 'react';
import NavBar from "../Components/Navbar/Navbar";

export default function CreateArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handlePost = async () => {
    // Adjusted to match the server's expected payload structure
    const article = {
      tittle: title, // Corrected based on error message, confirm if this is a typo.
      content: content,
      // Include the 'publication' field if necessary, or adjust server-side validation if not.
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
        // Reset form or redirect user as needed
      } else {
        const errorText = await response.text(); // Or response.json() if the server returns JSON
        console.error('Failed to post the article:', errorText);
        alert(`Failed to post the article. Server responded with: ${errorText}`);
      }
    } catch (error) {
      console.error('Error posting the article:', error);
      alert(`Error posting the article: ${error.message}`);
    }
  };
  
  

  return (
    <div>
      <NavBar />
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
    </div>
  );
}
