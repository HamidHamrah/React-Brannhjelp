import React, { useEffect, useState } from 'react';
// Assuming you're using Material UI for styling
import { Card, CardContent, Typography, Box } from '@mui/material';
import DOMPurify from 'dompurify';
import { CircularProgress } from '@mui/material';
 
const Read = ({ selectedArticleId }) => {
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const userId = "Hamid";
  useEffect(() => {
    const fetchArticle = async () => {
      if (selectedArticleId) {
        try {
          // Adjust the fetch URL to match your API endpoint and include any necessary headers
          const url = `https://localhost:7207/api/Publications/${selectedArticleId}?UserId=${userId}`;
          const response = await fetch(url);
          const articleData = await response.json();
          setArticle(articleData);
        } catch (error) {
          console.error("Failed to fetch article:", error);
          // Handle the error appropriately
        }
      }
    };

    fetchArticle();
  }, [selectedArticleId]); // Re-fetch when `selectedArticleId` changes

   // Display loading indicator while fetching article
   if (isLoading) {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="90vh">
            <CircularProgress />
        </Box>
    );
}

// If no article is selected or available yet
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
      width: '70%',
      margin: 'auto',
      mt: 5,
      overflow: 'hidden',
      maxHeight: '85vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Title section - Always visible */}
      <CardContent sx={{ padding: '16px' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {article.title}
        </Typography>
      </CardContent>
      {/* Scrollable content section */}
      <CardContent sx={{
        overflowY: 'auto',
        flexGrow: 1,
        padding: '0 16px' // Adds padding to the sides of the content area
      }}>
        <Typography variant="caption" display="block">
          Last Updated: {new Date(article.updatedAt).toLocaleString()}
        </Typography>
        <Box sx={{
          padding: '16px' // Adds vertical padding around the content, maintaining the side paddings
        }}>
          <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default Read;
