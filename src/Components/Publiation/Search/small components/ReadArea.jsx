//Note this component is not used for now as its suppose to be used later. 


import React from 'react';
import { Box, Typography } from '@mui/material';
import DOMPurify from 'dompurify';

const ReadArea = ({ selectedArticle }) => {
  if (!selectedArticle) {
    return <Box className="readarea-container" sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>Select an article to read</Box>;
  }

  return (
    <Box className="readarea-container" sx={{ flexGrow: 1, minWidth: { md: '500px' }, maxWidth: { md: '75%' }, overflowY: 'auto', p: 3 }}>
      <Typography variant="h5" component="h2" className="article-title">{selectedArticle.title}</Typography>
      <Typography variant="body1" className="article-body" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedArticle.content) }}></Typography>
    </Box>
  );
};

export default ReadArea;
