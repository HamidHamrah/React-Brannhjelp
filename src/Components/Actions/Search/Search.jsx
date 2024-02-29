import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, List, ListItem, ListItemText, Typography, Collapse, IconButton } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import DOMPurify from 'dompurify';

const Sidebar = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [expandedArticleIds, setExpandedArticleIds] = useState({});
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

  const handleArticleSelect = (articleId) => {
    setSelectedArticleId(articleId);
  };

  const toggleArticleExpansion = (articleId) => {
    setExpandedArticleIds(prevState => ({
      ...prevState,
      [articleId]: !prevState[articleId]
    }));
  };

  const renderArticles = (articles, depth = 0) => {
    return articles.map((article) => {
      const isExpanded = !!expandedArticleIds[article.id];
      const hasChildren = article.childPublications && article.childPublications.length > 0;

      return (
        <React.Fragment key={article.id}>
          <ListItem 
            button 
            onClick={() => handleArticleSelect(article.id)} 
            sx={{ pl: depth * 2, mb: 1, bgcolor: 'background.paper' }}
          >
            <ListItemText primary={article.title} />
            {hasChildren && (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation(); // Prevent ListItem click event from firing
                  toggleArticleExpansion(article.id);
                }}
                size="small"
              >
                {isExpanded ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            )}
          </ListItem>
          {hasChildren && (
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderArticles(article.childPublications, depth + 1)}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      );
    });
  };

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
          {renderArticles(filteredArticles)}
        </List>
      </Box>
      <Box className="article-content" sx={{ flexGrow: 1, minWidth: { md: '500px' }, maxWidth: { md: '70%' }, overflowY: 'auto', p: 3 }}>
        {selectedArticle && (
          <>
            <Typography variant="h5" component="h2" className="article-title">{selectedArticle.title}</Typography>
            <Typography variant="body1" className="article-body" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedArticle.content) }}></Typography>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
