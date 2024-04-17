import React from 'react';
import { Typography, Link, Box } from '@mui/material';

function Footer() {
  return (
    <Box
      sx={{
        padding: 3,
        marginTop: 'auto',
        backgroundColor: '#8cbfd3',
        // This positions the footer at the bottom of the screen.
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {'Copyright © '}
        <Link color="inherit" href="https://www.ignist.no/">
          Ignist
        </Link>
        {' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  );
}

export default Footer;
