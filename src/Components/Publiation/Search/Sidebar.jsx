import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, List, ListItem, ListItemText, Typography, Collapse, IconButton, ListItemIcon, Grid } from '@mui/material';
import { ExpandMore, ExpandLess, Article as ArticleIcon, Add as AddIcon } from '@mui/icons-material';
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import {jwtDecode} from 'jwt-decode';

const Sidebar = () => {
  const [articles, setArticles] = useState([]);
  const [articleMap, setArticleMap] = useState({});
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [expandedArticleIds, setExpandedArticleIds] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  // Helper function to get the value of a cookie by name
  const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  useEffect(() => {
    // Fetch the JWT token from cookies
    const token = getCookieValue('jwtToken');
    if (token) {
      // Decode the JWT token
      const decoded = jwtDecode(token);
      // Extract the user's role from the decoded token
      const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      // Update the userRole state with the extracted role
      setUserRole(role);
    }

    // Define a function to fetch articles
    const fetchArticles = async () => {
      try {
        // Make a GET request to fetch articles, using the JWT token in the Authorization header
        const response = await axios.get('https://localhost:7207/api/Publications', {
          headers: {
            Authorization: `bearer ${token}`, // Ensure the Authorization header is correctly formatted
          },
        });
        setArticles(response.data); // Update the state with the fetched articles

        // Flatten the articles and store them in a map for easy access
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

    // Call the fetchArticles function
    fetchArticles();
  }, []);


  const toggleArticleExpansion = (articleId) => {
    setExpandedArticleIds(prevState => ({
      ...prevState,
      [articleId]: !prevState[articleId]
    }));
  };
  const handleArticleSelect = (articleId) => {
    setSelectedArticleId(articleId);
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