import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Container } from '@mui/material';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle(prevArticle => ({ ...prevArticle, [name]: value }));
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
      navigate('/');
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
          onChange={handleChange}
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
          value={article.content}
          onChange={handleChange}
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
