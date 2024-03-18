import React, { useState, useContext } from 'react';
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
import Alert from '@mui/material/Alert'; // Import Alert for displaying messages
import AuthContext from '../../AuthenProvider';
import Cookies from 'js-cookie'; // Import js-cookie
import { jwtDecode } from 'jwt-decode';


const defaultTheme = createTheme();

export default function Login() {
  const {setAuth} = useContext(AuthContext);
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [apiMessage, setApiMessage] = useState({ type: '', text: '' }); // New state for API messages
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    return errors;
  };

const handleSubmit = async (event) => {
  event.preventDefault();
  const errors = validate(formData);
  if (Object.keys(errors).length === 0) {
    try {
      const response = await axios.post('https://localhost:7207/Auth/login', formData);
      if (response.status === 200) {
        // The original successful login handling
        setApiMessage({ type: 'success', text: 'Login successful! Redirecting...' });
        // Setting the cookie with the JWT token, assuming it's directly available in response.data.token
        Cookies.set('userToken', response.data, { expires: 7 }); // Adjust the 'expires' value as needed
        navigate('/home'); // Keep your original navigation timing

        // If you have an Auth context setup, update it here as per your original logic
        // e.g., setAuth({ token: response.data.token });
      }
    } catch (error) {
      setApiMessage({ type: 'error', text: error.response?.data?.message || 'Login failed. Please try again.' });
    }
  } else {
    setFormErrors(errors);
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
            Login
          </Typography>
          {/* Display API response message */}
          {apiMessage.text && (
            <Alert severity={apiMessage.type} sx={{ width: '100%', mt: 2 }}>
              {apiMessage.text}
            </Alert>
          )}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* Email Field */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  variant="standard"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                />
              </Grid>
              {/* Password Field */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  variant="standard"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!formErrors.password}
                  helperText={formErrors.password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/Register" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
