import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

function UpdatePublication() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('UserId');
  const navigate = useNavigate();

  const [article, setArticle] = useState({
    title: '',
    content: '',
    // Initialize updatedAt here if needed, or handle dynamically on submit
  });

  // Fetch the existing publication data on component mount
  useEffect(() => {
    const fetchUrl = `https://localhost:7207/api/Publications/${id}?UserId=${userId}`;
    fetch(fetchUrl)
      .then(response => response.json())
      .then(data => {
        setArticle({
          title: data.title,
          content: data.content,
          // Assuming 'updatedAt' is part of the response, otherwise handle separately
        });
      })
      .catch(error => console.error('Error fetching article:', error));
  }, [id, userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle(prevArticle => ({ ...prevArticle, [name]: value }));
  };

  // Handle the article update submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const updateUrl = `https://localhost:7207/api/Publications/${id}`; // Note: UserId is not appended here
    fetch(updateUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...article,
        updatedAt: new Date().toISOString(), // Update 'updatedAt' dynamically on submit
        // Include 'id' and 'UserId' if necessary for your backend logic
        id: id,
        userId: userId,
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      navigate('/All'); // Redirect after successful update
    })
    .catch(error => console.error('Error updating article:', error));
  };

  return (
    <div className="update-container">
      <form onSubmit={handleSubmit} className="update-form">
        <div className="input-group">
          <label htmlFor="title" className="input-label">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={article.title}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label htmlFor="content" className="input-label">Content:</label>
          <textarea
            id="content"
            name="content"
            value={article.content}
            onChange={handleChange}
            className="textarea-field"
          />
        </div>
        <button type="submit" className="submit-button">Update Article</button>
      </form>
    </div>
  );
}

export default UpdatePublication;
