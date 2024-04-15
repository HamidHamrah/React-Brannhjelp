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

export default function ResetPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    code: '',
    email: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [apiMessage, setApiMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = "Email address is invalid";
    if (!values.code) errors.code = "Reset code is required";
    if (!values.newPassword) errors.newPassword = "New password is required";
    else if (values.newPassword.length < 8) errors.newPassword = "Password must be at least 8 characters long";
    if (values.newPassword !== values.confirmPassword) errors.confirmPassword = "Passwords do not match";
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validate(formData);
    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch(`https://localhost:7207/Auth/reset-password
        `, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code: formData.code,
            email: formData.email,
            newPassword: formData.newPassword,
            confirmPassword: formData.confirmPassword,
          }),
        });
        if (response.ok) {
          setApiMessage({ type: 'success', text: 'Password has been reset successfully.' });
          navigate('/login'); // Redirect to login page or other appropriate action
        } else {
          throw new Error('Failed to reset password. Please try again later.');
        }
      } catch (error) {
        setApiMessage({ type: 'error', text: error.message || 'An error occurred.' });
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
          <Typography component="h1" variant="h5">Reset Password</Typography>
          {apiMessage.text && <Alert severity={apiMessage.type} sx={{ width: '100%', mt: 2 }}>{apiMessage.text}</Alert>}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              required
              fullWidth
              id="code"
              label="Reset Code"
              name="code"
              autoComplete="off"
              variant="standard"
              value={formData.code}
              onChange={handleChange}
              error={!!formErrors.code}
              helperText={formErrors.code}
            />
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
              sx={{ mt: 2 }}
            />
            <TextField
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              id="newPassword"
              autoComplete="new-password"
              variant="standard"
              value={formData.newPassword}
              onChange={handleChange}
              error={!!formErrors.newPassword}
              helperText={formErrors.newPassword}
              sx={{ mt: 2 }}
            />
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              variant="standard"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!formErrors.confirmPassword}
              helperText={formErrors.confirmPassword}
              sx={{ mt: 2 }}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Reset Password</Button>
            <Link href="/login" variant="body2">Remember your password? Log in</Link>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
