import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Avatar, TextField, Button, Box, Container, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import {jwtDecode} from 'jwt-decode';

function UserUpdateForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    userName: '',
    lastName: '',
    email: '',
    role: '',
  });

  const [userRole, setUserRole] = useState('');
  const [errors, setErrors] = useState({
    userName: '',
    lastName: '',
    email: '',
  });

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
        .then(response => response.json())
        .then(data => {
          setUser({
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
          setSnackbar({ open: true, message: `Failed to fetch data: ${error.message}`, severity: 'error' });
        });
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let errorMsg = '';

    switch (fieldName) {
      case 'userName':
      case 'lastName':
        if (!value.trim()) errorMsg = 'This field cannot be empty';
        break;
      case 'email':
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)) errorMsg = 'Invalid email format';
        break;
      default:
        break;
    }

    setErrors(prev => ({ ...prev, [fieldName]: errorMsg }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation on submit for all fields
    const fieldsToValidate = ['userName', 'lastName', 'email'];
    let isValid = true;
    fieldsToValidate.forEach(field => {
      validateField(field, user[field]);
      if (errors[field]) isValid = false;
    });

    if (!isValid) {
      setSnackbar({ open: true, message: 'Please correct the errors before submitting.', severity: 'error' });
      return;
    }

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
        <Avatar sx={{ margin: 'auto', bgcolor: 'secondary.main' }}></Avatar>
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
          error={!!errors.userName}
          helperText={errors.userName}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          autoComplete="lastName"
          value={user.lastName}
          onChange={handleChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
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
          error={!!errors.email}
          helperText={errors.email}
        />
        {userRole === 'Admin' && (
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
        )}
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
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
