import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, List, ListItem, ListItemText, Collapse, IconButton, ListItemIcon } from '@mui/material';
import { ExpandMore, ExpandLess, Article as ArticleIcon, Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const Sidebar = ({ onArticleSelect }) => {
  const [articles, setArticles] = useState([]);
  const [articleMap, setArticleMap] = useState({});
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [expandedArticleIds, setExpandedArticleIds] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  useEffect(() => {
    let logoutTimer = null;
    const token = getCookieValue('jwtToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        setUserRole(role);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      // Initiate logout after 5 seconds if not logged in
      logoutTimer = setTimeout(() => {
        navigate('/login');
      }, 5000);
    }

    // Function to fetch articles
    const fetchArticles = async () => {
      try {
        const response = await axios.get('https://localhost:7207/api/Publications', {
          headers: token ? { Authorization: `bearer ${token}` } : {}
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

    // Call fetchArticles regardless of login status
    fetchArticles();

    return () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
    };
  }, []);


  const toggleArticleExpansion = (articleId) => {
    setExpandedArticleIds(prevState => ({
      ...prevState,
      [articleId]: !prevState[articleId]
    }));
  };
  const handleArticleSelect = (articleId) => {
    onArticleSelect(articleId); // call the callback with the selected article's ID
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
              bgcolor: isSelected ? '#daeaf1' : 'background.paper',
              '&:hover': {
                bgcolor: '#8cbfd3',
                color: '#000000',
              },
              color: isSelected ? '#000000' : '#000000',
            }}
          >
            <ListItemIcon>
              <ArticleIcon color={isSelected ? "inherit" : "action"} />
            </ListItemIcon>
            <ListItemText primary={article.title} />
            {userRole === "Admin" && (
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
    <Box className="sidebar-container">
      <Box className="search-and-list">
        <Box>
          <div className="search-input">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {userRole === "admin" && (
            <IconButton
              onClick={handleAddParentArticle}
              color="#f2f8fa"
              aria-label="add parent article"
            >
              <AddIcon />
            </IconButton>
          )}
        </Box>
        <List className="articles-list">
          {renderArticles(articles.filter(article =>
            article.title.toLowerCase().includes(searchTerm.toLowerCase())))
          }
        </List>
      </Box>
    </Box>
  );  
};

export default Sidebar;