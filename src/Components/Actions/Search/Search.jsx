import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, List, ListItem, ListItemText, Typography, Collapse, IconButton, ListItemIcon } from '@mui/material';
import { ExpandMore, ExpandLess, Article as ArticleIcon, Add as AddIcon } from '@mui/icons-material';
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Sidebar = () => {
  const [articles, setArticles] = useState([]);
  const [articleMap, setArticleMap] = useState({});
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [expandedArticleIds, setExpandedArticleIds] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const userRole = "admin";
  const navigate = useNavigate();

  // Helper function to get the value of a cookie by name
  const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Get the JWT token from cookies
        const token = getCookieValue('jwtToken'); // Assuming the cookie name is jwtToken
        console.log(token)
        const response = await axios.get('https://localhost:7207/api/Publications', {
          headers: {
            Authorization: `bearer ${token}` // Use the token in the Authorization header
          }
        });
        setArticles(response.data);
        const flatMap = {};
        const flattenArticles = (articles) => {
          articles.forEach(article => {
            flatMap[article.id] = article;
            if (article.childPublications) {
              flattenArticles(article.childPublications);
            }
          });
        };
        flattenArticles(response.data);
        setArticleMap(flatMap);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchArticles();
  }, []);

  const handleArticleSelect = (articleId) => {
    setSelectedArticleId(articleId);
  };

  const toggleArticleExpansion = (articleId) => {
    setExpandedArticleIds(prevState => ({
      ...prevState,
      [articleId]: !prevState[articleId]
    }));
  };

  const handleAddParentArticle = (e) => {
    e.stopPropagation();
    navigate('/create', { state: { parentId: null } });
  };

  const handleAddChildArticle = (articleId, e) => {
    e.stopPropagation();
    navigate('/create', { state: { parentId: articleId } });
  };

  const renderArticles = (articles, depth = 0) => {
    return articles.map((article) => {
      const isExpanded = !!expandedArticleIds[article.id];
      const hasChildren = article.childPublications && article.childPublications.length > 0;
      const isSelected = article.id === selectedArticleId;
  
      return (
        <React.Fragment key={article.id}>
          <ListItem 
            button 
            onClick={() => handleArticleSelect(article.id)} 
            sx={{ 
              pl: depth * 2, 
              mb: 1, 
              bgcolor: isSelected ? 'primary.light' : 'background.paper',
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
              },
              color: isSelected ? 'primary.contrastText' : 'text.primary',
            }}
          >
            <ListItemIcon>
              <ArticleIcon color={isSelected ? "inherit" : "action"} />
            </ListItemIcon>
            <ListItemText primary={article.title} />
            {userRole === "admin" && (
              <IconButton
                onClick={(e) => handleAddChildArticle(article.id, e)}
                size="small"
              >
                <AddIcon color="inherit" />
              </IconButton>
            )}
            {hasChildren && (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  toggleArticleExpansion(article.id);
                }}
                size="small"
              >
                {isExpanded ? <ExpandLess color="inherit" /> : <ExpandMore color="inherit" />}
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
  
  const selectedArticle = articleMap[selectedArticleId];

  return (
    <Box className="layout-container" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, height: '100vh', overflow: 'hidden' }}>
      <Box className="search-and-list" sx={{ width: { xs: '100%', md: '25%' }, flexShrink: 0, maxHeight: '100vh', overflowY: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {userRole === "admin" && (
            <IconButton
              onClick={handleAddParentArticle}
              color="primary"
              aria-label="add parent article"
            >
              <AddIcon />
            </IconButton>
          )}
        </Box>
        <List>
          {renderArticles(articles.filter(article =>
            article.title.toLowerCase().includes(searchTerm.toLowerCase())))
          }
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
