import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, CircularProgress, ListItemIcon } from '@mui/material';
import WhatshotIcon from '@mui/icons-material/Whatshot'; // Fire icon
import DOMPurify from 'dompurify';

const Read = ({ selectedArticleId, onSelectArticle }) => {
  const [article, setArticle] = useState(null);
  const [topArticles, setTopArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchArticle = async (id) => {
      try {
        setIsLoading(true);
        const url = `https://localhost:7207/api/Publications/${id}?UserId=Hamid`;
        const response = await fetch(url);
        const articleData = await response.json();
        setArticle(articleData);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch article:", error);
        setIsLoading(false);
      }
    };

    if (selectedArticleId) {
      fetchArticle(selectedArticleId);
    } else {
      fetchTopArticles();
    }
  }, [selectedArticleId]);

  const fetchTopArticles = async () => {
    try {
      setIsLoading(true);
      const url = `https://localhost:7207/api/Publications`;
      const response = await fetch(url);
      const articles = await response.json();
      setTopArticles(articles.slice(0, 10)); // Limit to the top 6 articles
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch top articles:", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="90vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!article && topArticles.length > 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="90vh" flexWrap="wrap">
        {topArticles.map((article) => (
          <Box key={article.id} sx={{ margin: 2, cursor: 'pointer' }} onClick={() => onSelectArticle(article.id)}>
            <Card sx={{ width: 300, height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CardContent>
                <Typography variant="h6">{article.title}</Typography>
                <ListItemIcon sx={{ fontSize: '3rem' }}> 
                  <WhatshotIcon color="error" sx={{ fontSize: 64 }} /> {/* Large fire icon */}
                </ListItemIcon>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    );
  }

  if (!article) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="90vh" textAlign="center">
        <Typography variant="h6" color="textSecondary">
          No article selected or article is loading...
        </Typography>
      </Box>
    );
  }

  const cleanHTML = DOMPurify.sanitize(article.content);
  return (
    <Card raised sx={{
      width: '70%', margin: 'auto', mt: 5, overflow: 'hidden', maxHeight: '85vh', display: 'flex', flexDirection: 'column'
    }}>
      <CardContent sx={{ padding: '16px' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {article.title}
        </Typography>
      </CardContent>
      <CardContent sx={{ overflowY: 'auto', flexGrow: 1, padding: '0 16px' }}>
        <Typography variant="caption" display="block">
          Last Updated: {new Date(article.updatedAt).toLocaleString()}
        </Typography>
        <Box sx={{ padding: '16px' }}>
          <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default Read;
