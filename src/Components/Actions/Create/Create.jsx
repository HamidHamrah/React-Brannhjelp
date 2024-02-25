import React, { useState } from 'react';
import { Container, TextField, Button, Box, Snackbar, Alert } from '@mui/material';
import FroalaEditor from 'react-froala-wysiwyg';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';

let lastId = 10; // Initialize outside the component

export default function Create() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

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
        <FroalaEditor
          tag='textarea'
          model={content}
          onModelChange={setContent}
          config={{
            placeholderText: 'Edit Your Content Here!',
            pluginsEnabled: ['align', 'charCounter', 'codeView', 'colors', 'draggable', 'emoticons', 'fontFamily', 'fontSize', 'fullscreen', 'inlineStyle', 'lineBreaker', 'link', 'lists', 'paragraphFormat', 'paragraphStyle', 'quote', 'save', 'url', 'wordPaste'],
            toolbarButtons: ['bold', 'italic', 'underline', '|', 'formatOL', 'formatUL', 'outdent', 'indent', '|', 'insertLink', 'insertImage', 'insertTable', '|', 'emoticons', 'fontFamily', 'fontSize', 'color', '|', 'align', 'paragraphFormat', 'paragraphStyle', '|', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html'],
            // Include other configuration options as needed
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
