import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

export default function SignUp() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return /^[A-Za-z]+$/.test(value) ? '' : 'Only characters are allowed';
      case 'email':
        return /\S+@\S+\.\S+/.test(value) ? '' : 'Email address is invalid';
      case 'password':
        return value.length >= 8 ? '' : 'Password must be 8 characters or more';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: validateField(name, value) });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = Object.keys(formValues).reduce((acc, key) => {
      acc[key] = validateField(key, formValues[key]);
      return acc;
    }, {});
    setFormErrors(errors);
    if (!Object.values(errors).some((error) => error)) {
      try {
        const response = await axios.post('https://localhost:7207/Auth/register', {
          userName: formValues.firstName,
          lastName: formValues.lastName,
          email: formValues.email,
          password: formValues.password,
        });
        if (response.status === 200) {
          navigate('/login');
        }
      } catch (error) {
        console.error('Registration failed:', error);
        // Handle specific error based on response if needed
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  variant="standard"
                  autoFocus
                  error={!!formErrors.firstName}
                  helperText={formErrors.firstName}
                  onChange={handleChange}
                  value={formValues.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  variant="standard"
                  autoComplete="family-name"
                  error={!!formErrors.lastName}
                  helperText={formErrors.lastName}
                  onChange={handleChange}
                  value={formValues.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  variant="standard"
                  autoComplete="email"
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                  onChange={handleChange}
                  value={formValues.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  variant="standard"
                  autoComplete="new-password"
                  error={!!formErrors.password}
                  helperText={formErrors.password}
                  onChange={handleChange}
                  value={formValues.password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
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
