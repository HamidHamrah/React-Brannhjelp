import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { Card, CardContent, Typography } from '@mui/material';

const ArticleDisplay = () => {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://localhost:7207/api/Publications/1284?UserId=Hamid', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setArticle(data);
    };

    try {
      fetchData();
    } catch (error) {
      console.error('Fetching error:', error);
    }
  }, []);

  if (!article) {
    return <Typography>Loading...</Typography>;
  }

  const sanitizedContent = DOMPurify.sanitize(article.content);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{article.title}</Typography>
        <Typography variant="body2" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        <Typography variant="caption">Created at: {new Date(article.createdAt).toLocaleDateString()}</Typography>
        <br />
        <Typography variant="caption">Updated at: {new Date(article.updatedAt).toLocaleDateString()}</Typography>
      </CardContent>
    </Card>
  );
};

export default ArticleDisplay;
