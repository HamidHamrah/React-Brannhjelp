import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {Avatar, TextField, Button, Box, Container, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import {jwtDecode} from "jwt-decode"; // Ensure this import is correct

function UserUpdateForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: id,
    userName: '',
    lastName: '',
    email: '',
    role: '',
  });

  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  useEffect(() => {
    const token = getCookieValue('jwtToken');
    if (token) {
      const decoded = jwtDecode(token);
      const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']; // Accessing the role from the JWT
      setUserRole(role);
    }

    if (id) {
      const fetchUrl = `https://localhost:7207/Auth/aboutme?id=${id}`;
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
            id: id,
            userName: data.userName,
            lastName: data.lastName,
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
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getCookieValue('jwtToken');
    const updateUrl = `https://localhost:7207/Auth/update-user/${id}`;
    const requestBody = {
      userName: user.userName,
      lastName: user.lastName,
      newEmail: user.email,
      role: user.role || 'Normal', // Default to 'Normal' if role isn't set
    };

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
      setSnackbar({ open: true, message: `Failed to update user: ${error.message}`, severity: 'error' });
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
        {/* Text fields for userName, lastName, and email */}
        <Avatar sx={{ margin: 'auto', bgcolor: 'secondary.main' }}></Avatar>
        <TextField margin="normal" required fullWidth id="userName" label="Username" name="userName" autoComplete="username" autoFocus value={user.userName} onChange={handleChange} />
        <TextField margin="normal" required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="lastName" value={user.lastName} onChange={handleChange} />
        <TextField margin="normal" required fullWidth id="email" label="Email" name="email" autoComplete="email" value={user.email} onChange={handleChange} />

        {/* Conditionally render the role selection based on userRole */}
        {userRole === 'Admin' && (
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Role</InputLabel>
            <Select labelId="role-label" id="role" name="role" value={user.role || ''} label="Role" onChange={handleChange}>
              <MenuItem value="Normal">Normal</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
          </FormControl>
        )}

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Update User</Button>
      </Box>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
}

export default UserUpdateForm;
