
import React, { useState } from 'react';
import axios from 'axios';
import styles from './Create.module.css';


//useState hooks for bruker innput
const CreatePublication = () => {
  const [title, setTitle] = useState('');
  
  const [content, setContent] = useState('');

  //funksjon som oppretter nye publikasjoner
  const handleCreate = async () => {
    try {

      //POST forespøresel til endepunkt
      const response = await axios.post('http://localhost:5041/api/publications', {
        Tittle: title,
        Contetn: content,
      });

      console.log('Publication created:', response.data);
    } 
    catch (error) {
      console.error('Error creating publication:', error);
    }
  };

  //Brukergrensesnitt for komponenten med input felt
  return (
    <div className={styles.container}>
      <h2>Create Publication</h2>

      <div className={styles.gruppe}>
        <label>Title:</label>
        <input className={styles.inputbox} type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}/>
      </div>

      <div className={styles.gruppe}>
        <label>Content:</label>
        <textarea className={styles.textbox} 
                  value={content} 
                  onChange={(e) => setContent(e.target.value)} />
      </div>

        <button className={styles.buttonC} onClick={handleCreate}>Create Publication</button>
    </div>
  );
};

export default CreatePublication;