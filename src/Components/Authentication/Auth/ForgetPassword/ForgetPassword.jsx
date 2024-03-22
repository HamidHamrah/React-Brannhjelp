import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.ignist.no/">
        Ignist
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState('');
  const [apiMessage, setApiMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setEmail(e.target.value);
    setFormError('');
  };

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) return "Email address is invalid";
    return '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const error = validateEmail(email);
    if (!error) {
      try {
        // Modify this part to call the specified API endpoint
        const response = await fetch(`https://localhost:7207/Auth/ForgotPassword?email=${encodeURIComponent(email)}`, {
          method: 'POST', // Assuming the endpoint expects a POST request
          headers: {
            'Content-Type': 'application/json',
          },
          // Include additional options if required by the server
        });
        if (response.ok) {
          setApiMessage({ type: 'success', text: 'Reset code sent! Check your email.' });
        } else {
          // Handle server errors or unsuccessful responses
          throw new Error('Failed to send reset code. Please try again later.');
        }
        navigate('/Resetpassword');

      } catch (error) {
        // Handle network errors or exceptions thrown from handling response
        setApiMessage({ type: 'error', text: error.message || 'An error occurred.' });
      }
    } else {
      setFormError(error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">Forgot Password</Typography>
          {apiMessage.text && <Alert severity={apiMessage.type} sx={{ width: '100%', mt: 2 }}>{apiMessage.text}</Alert>}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              variant="standard"
              value={email}
              onChange={handleChange}
              error={!!formError}
              helperText={formError}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Send Reset Code</Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Remember your password? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
