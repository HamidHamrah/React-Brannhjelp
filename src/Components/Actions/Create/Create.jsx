import React, { useState } from 'react';
import { Container, TextField, Button, Box } from '@mui/material';

let lastId = 0; // Initialize with 9 so the first use increments to 10

export default function Create() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handlePost = async () => {
    lastId++; // Increment the ID for each new article
    const article = {
      id: lastId.toString(), // Convert to string to match your JSON structure
      title: title,
      content: content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: "Hamid", // Static userId, replace with dynamic value when authentication is implemented
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
    <Container maxWidth="md" sx={{ mt: 2, mb: 4, boxShadow: 3, borderRadius: 2, p: 3 }}>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          autoComplete="title"
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="content"
          label="Content"
          type="text"
          id="content"
          autoComplete="current-content"
          multiline
          rows={20}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          onClick={handlePost}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Post
        </Button>
      </Box>
    </Container>
  );
}
