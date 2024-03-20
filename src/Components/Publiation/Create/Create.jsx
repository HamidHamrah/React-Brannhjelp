import React, { useState } from 'react';
import { Container, TextField, Button, Box, Snackbar, Alert } from '@mui/material';
import FroalaEditor from 'react-froala-wysiwyg';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';
import { useLocation } from 'react-router-dom'; // Import useLocation

// Assuming you might pass parentId some other way or determine it within this component

export default function Create() {
  const location = useLocation(); // Use useLocation to access the navigation state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const parentId = location.state?.parentId; // Retrieve parentId from the navigation state
  
  const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  const handlePost = async () => {
    const newId = Math.floor(Math.random() * 10000); // Generate a random new ID

    const article = {
      id: newId.toString(),
      title: title,
      content: content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: "Hamid", // Adjust as needed to match your user identification logic
      parentId: parentId || "" , // Use the parentId directly from the state
      childPublications: [],
    };

  
    console.log(parentId); // Debug log to verify the article object
    try {
      const token = getCookieValue('jwtToken'); // Assuming the cookie name is jwtToken
      const response = await fetch('https://localhost:7207/api/Publications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}` // Use the token in the Authorization header
          
        },
        body: JSON.stringify(article),
      });
      if (response.ok) {
        setSnackbarMessage('Article posted successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        setTitle('');
        setContent('');
      } else {
        const errorText = await response.text();
        console.error('Failed to post the article:', errorText);
        setSnackbarMessage('Failed to post the article. Please try again later.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error posting the article:', error);
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
    <Container maxWidth="md" sx={{ mt: 2, mb: 4, boxShadow: 0, borderRadius: 2, p: 3 }}>
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
        <FroalaEditor
          tag='textarea'
          model={content}
          onModelChange={setContent}
          config={{
            placeholderText: 'Edit Your Content Here!',
            pluginsEnabled: ['align', 'charCounter', 'codeView', 'colors', 'draggable', 'emoticons', 'fontFamily', 'fontSize', 'fullscreen', 'inlineStyle', 'lineBreaker', 'link', 'lists', 'paragraphFormat', 'paragraphStyle', 'quote', 'save', 'url', 'wordPaste', 'table', 'specialCharacters', 'print'],
            toolbarButtons: ['bold', 'italic', 'underline', '|', 'formatOL', 'formatUL', 'outdent', 'indent', '|', 'insertLink', 'insertImage', 'insertTable', 'specialCharacters', '|', 'emoticons', 'fontFamily', 'fontSize', 'color', '|', 'align', 'paragraphFormat', 'paragraphStyle', '|', 'fullscreen', 'print', '|', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html'],
          }}
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
