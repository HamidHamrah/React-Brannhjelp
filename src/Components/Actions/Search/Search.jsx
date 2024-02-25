import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, List, ListItem, ListItemText, Typography } from '@mui/material';

const Sidebar = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('https://localhost:7207/api/publications');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchArticles();
  }, []);

  const filteredArticles = articles.filter(article =>
    article.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const selectedArticle = articles.find(article => article.id === selectedArticleId);

  return (
    <Box className="layout-container" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, height: '100vh', overflow: 'hidden' }}>
      <Box className="search-and-list" sx={{ width: { xs: '100%', md: '25%' }, flexShrink: 0, maxHeight: '100vh', overflowY: 'auto' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />
        <List>
          {filteredArticles.map((article) => (
            <ListItem button key={article.id} onClick={() => setSelectedArticleId(article.id)} sx={{ mb: 1, bgcolor: 'background.paper' }}>
              <ListItemText primary={article.title} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box className="article-content" sx={{ flexGrow: 1, minWidth: { md: '500px' }, maxWidth: { md: '70%' }, overflowY: 'auto', p: 3 }}>
        {selectedArticle && (
          <>
            <Typography variant="h5" component="h2" className="article-title">{selectedArticle.title}</Typography>
            {/* Here we render the HTML content safely */}
            <Typography variant="body1" className="article-body" dangerouslySetInnerHTML={{ __html: selectedArticle.content }}></Typography>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
