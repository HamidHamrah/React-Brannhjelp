import React, { useState } from 'react';
import axios from 'axios';
import styles from './Update.module.css';

const UpdatePublication = ({ publicationId, existingTitle, existingContent, onSuccess }) => {
  const [title, setTitle] = useState(existingTitle);
  const [content, setContent] = useState(existingContent);


  
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5041/api/publications/${publicationId}`, {
        Tittle: title,
      
        Contetn: content,
      });

      console.log('Publication updated:', response.data);
      alert('Publication Upadated');

      onSuccess();
    } catch (error) {
      console.error('Error updating publication:', error);
      alert('Failed to update publication. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
    <h2>Update Publication</h2>
    <div className={styles.gruppe}>
      <label htmlFor="title">Title:</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
    <div>
      <label htmlFor="content" className={styles.gruppe}>Content:</label>
      <textarea
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
    <button onClick={handleUpdate}>Submit Update</button>
  </div>
);
};

export default UpdatePublication;
