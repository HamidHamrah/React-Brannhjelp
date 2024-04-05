import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Container, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function UserUpdateForm() {
  // Use ID from the URL parameters
  const { id } = useParams();
  const navigate = useNavigate();

  // Initialize user state with ID
  const [user, setUser] = useState({
    id: id,
    userName: '',
    lastName: '',
    email: '',
    role: '',
  });

  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info', // Can be "error", "warning", "info", "success"
  });

  // Function to get the cookie value by name
  const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  useEffect(() => {
    if (id) { // Only proceed if id is defined
      const token = getCookieValue('jwtToken');
      const fetchUrl = `https://localhost:7207/Auth/aboutme?id=${id}`;

      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`,
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
            id: id,
            userName: data.userName,
            lastName:data.lastName,
            email: data.email,
            role: data.role,
          });
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching user:', error);
          setLoading(false);
        });
    }
  }, [id]); // Depend on ID


  // Handle input change
  const handleChange = (event) => {
    console.log(event.target); // Add this to inspect the event object
    const { name, value } = event.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };



  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getCookieValue('jwtToken');
    const updateUrl = `https://localhost:7207/Auth/update-user/${user.id}`; // Using the userId from the user state

    // Adjust the payload to match the API's expected format
    const requestBody = {
      userName: user.userName,
      lastName: user.lastName,
      newEmail: user.email, // Use newEmail instead of email to match the API's expectation
      role: user.role,
    };

    console.log("Sending update request to URL:", updateUrl);
    console.log("With payload:", requestBody);

    try {
      const response = await fetch(updateUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
      }

      setSnackbar({ open: true, message: 'User updated successfully', severity: 'success' });
      navigate('/AllUsers');
    } catch (error) {
      console.error('Error updating user:', error);
      setSnackbar({ open: true, message: `Failed to update user due to a network error or other unexpected issue: ${error.message}`, severity: 'error' });
    }
  };



  // Handle snackbar close
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
          id="lastName"
          label="lastName"
          name="lastName"
          autoComplete="lastName"
          autoFocus
          value={user.lastName}
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
            value={user.role || ''}
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
