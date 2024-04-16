import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Import useAuth hook
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
import Alert from '@mui/material/Alert';


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

export default function Login() {
  const navigate = useNavigate();
  const { login, user } = useAuth(); // Use login function from AuthContext
  const [formErrors, setFormErrors] = useState({});
  const [apiMessage, setApiMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    // Redirect if already logged in
    if (user) navigate('/home');
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = "Email address is invalid";
    if (!values.password) errors.password = "Password is required";
    else if (values.password.length < 8) errors.password = "Password must be at least 8 characters long";
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validate(formData);
    if (Object.keys(errors).length === 0) {
      const { success, message } = await login(formData.email, formData.password);
      if (success) {
        setApiMessage({ type: 'success', text: 'Login successful! Redirecting...' });
        navigate('/home');
      } else {
        setApiMessage({ type: 'error', text: message });
      }
    } else {
      setFormErrors(errors);
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
          <Typography component="h1" variant="h5">Login</Typography>
          {apiMessage.text && <Alert severity={apiMessage.type} sx={{ width: '100%', mt: 2 }}>{apiMessage.text}</Alert>}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
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
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Login</Button>
            <Grid container justifyContent="flex-end">
              <Grid item xs>
                <Link href="ForgetPassword" variant="body2">Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link href="/Register" variant="body2">
                  Don't have an account? Sign Up
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

