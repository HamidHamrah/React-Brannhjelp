import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Container, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';


function UserUpdateForm() {
  const { email: encodedEmail } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    userName: '',
    email: decodeURIComponent(encodedEmail),
    newEmail: '', // Initialize if you need a separate field for updating email
    role: '', // Make sure to initialize role
  });
  
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info', // can be "error", "warning", "info", "success"
  });

  const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  useEffect(() => {
    const token = getCookieValue('jwtToken');
    const fetchUrl = `https://localhost:7207/Auth/aboutme?email=${user.email}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };

    fetch(fetchUrl, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        return response.json();
      })
      .then(data => {
        setUser({
          userName: data.userName,
          email: data.email,
          role: data.role,
        });
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        setLoading(false);
      });
  }, [user.email]); // Reacting to email state change can lead to unintended re-fetches, consider restructuring if this becomes an issue

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getCookieValue('jwtToken'); // Assume you have a similar method to fetch JWT token
    const updateUrl = `https://localhost:7207/Auth/update-user/${encodeURIComponent(user.email)}`;
  
    try {
      const response = await fetch(updateUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userName: user.userName,
          newEmail: user.email, // Adjust based on your API. If the API expects "email", use that instead.
          role: user.role,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      setSnackbar({ open: true, message: 'User updated successfully', severity: 'success' });
      navigate('/AllUsers'); // Adjust the navigation target as needed
    } catch (error) {
      console.error('Error updating user:', error);
      setSnackbar({ open: true, message: 'Failed to update user due to a network error or other unexpected issue.', severity: 'error' });
    }
  };
  
  

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="userName"
          label="Username"
          name="userName"
          autoComplete="username"
          autoFocus
          value={user.userName}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          value={user.email}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            id="role"
            name="role"
            value={user.role}
            label="Role"
            onChange={handleChange}
          >
            <MenuItem value="Normal">Normal</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Update User
        </Button>
      </Box>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default UserUpdateForm;
