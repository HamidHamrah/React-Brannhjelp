//Note this component is not used for now as its suppose to be later

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, List, ListItem, ListItemText, IconButton, ListItemIcon, Collapse } from '@mui/material';
import { ExpandMore, ExpandLess, Article as ArticleIcon, Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [articles, setArticles] = useState([]);
  const [articleMap, setArticleMap] = useState({});
  const [expandedArticleIds, setExpandedArticleIds] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const userRole = "admin"; // Assume "admin" role for demonstration
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('https://localhost:7207/api/publications');
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
    navigate(`/article/${articleId}`);
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
  
      return (
        <React.Fragment key={article.id}>
          <ListItem 
            button 
            onClick={() => handleArticleSelect(article.id)} 
            sx={{ 
              pl: depth * 2, 
              mb: 1, 
              bgcolor: 'background.paper',
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
              },
              color: 'text.primary',
            }}
          >
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary={article.title} />
            {userRole === "admin" && (
              <IconButton
                onClick={(e) => handleAddChildArticle(article.id, e)}
                size="small"
              >
                <AddIcon />
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

  return (
    <Box className="sidebar-container" sx={{ width: { xs: '100%', md: '25%' }, maxHeight: '100vh', overflowY: 'auto' }}>
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
  );
};

export default Sidebar;
