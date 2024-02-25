import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Container } from '@mui/material';
import FroalaEditor from 'react-froala-wysiwyg';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';

function UpdatePublication() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('UserId');
  const navigate = useNavigate();

  const [article, setArticle] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    const fetchUrl = `https://localhost:7207/api/Publications/${id}?UserId=${userId}`;
    fetch(fetchUrl)
      .then(response => response.json())
      .then(data => {
        setArticle({
          title: data.title,
          content: data.content,
        });
      })
      .catch(error => console.error('Error fetching article:', error));
  }, [id, userId]);

  const handleModelChange = (model) => {
    setArticle(prevArticle => ({ ...prevArticle, content: model }));
  };

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setArticle(prevArticle => ({ ...prevArticle, title: newTitle }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateUrl = `https://localhost:7207/api/Publications/${id}`;
    fetch(updateUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...article,
        updatedAt: new Date().toISOString(),
        id: id,
        userId: userId,
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      navigate('/All');
    })
    .catch(error => console.error('Error updating article:', error));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 0, mb: 4, boxShadow: 0, borderRadius: 2, p: 3 }}>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          autoComplete="title"
          autoFocus
          value={article.title}
          onChange={handleTitleChange}
          variant="outlined"
        />
        <FroalaEditor
          model={article.content}
          onModelChange={handleModelChange}
          tag='textarea'
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Update Article
        </Button>
      </Box>
    </Container>
  );
}

export default UpdatePublication;
