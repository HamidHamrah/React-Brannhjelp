import React, { useState } from 'react';
import { Container, TextField, Button, Box, Snackbar, Alert } from '@mui/material';

let lastId = 10; // Initialize outside the component if it doesn't need to reset between component re-renders

export default function Create() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false); // State to control Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Optional: State to manage Snackbar message dynamically
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Optional: State to manage Snackbar severity dynamically

  const handlePost = async () => {
    lastId++; // Increment the ID for each new article
    const article = {
      id: lastId.toString(),
      title: title,
      content: content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: "Hamid",
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
        // Update Snackbar message and severity then show it
        setSnackbarMessage('Article posted successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        setTitle(''); // Reset form fields
        setContent('');
      } else {
        const errorText = await response.text();
        console.error('Failed to post the article:', errorText);
        // Optionally, show error message in Snackbar
        setSnackbarMessage('Failed to post the article. Please try again later.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error posting the article:', error);
      // Optionally, show error message in Snackbar
      setSnackbarMessage('Error posting the article. Please try again later.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
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
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
