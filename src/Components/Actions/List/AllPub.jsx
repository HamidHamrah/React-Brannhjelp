import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton,
  Snackbar, Alert
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function Read() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const UserID = 'Hamid';
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  useEffect(() => {
    const token = getCookieValue('jwtToken'); // Retrieve the JWT token from cookies
  
    fetch('https://localhost:7207/api/Publications', {
      headers: {
        Authorization: `bearer ${token}`, // Include the JWT token in the Authorization header
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(setData)
    .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const renderRows = (items, level = 0) => {
    return items.map((item) => (
      <React.Fragment key={item.id}>
        <TableRow>
          <TableCell>{item.id}</TableCell>
          <TableCell style={{ paddingLeft: `${level * 20}px` }}>{item.title}</TableCell>
          <TableCell>
            <IconButton onClick={() => handleUpdate(item)} color="primary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleClickOpen(item)} color="error">
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
        {item.childPublications && renderRows(item.childPublications, level + 1)}
      </React.Fragment>
    ));
  };

  const handleUpdate = (publication) => {
    const queryParams = new URLSearchParams({
      UserId: UserID,
      parentId: publication.parentId || ''
    }).toString();

    navigate(`/update/${publication.id}?${queryParams}`);
  };


  const handleClickOpen = (item) => {
    setSelectedPublication(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    if (!selectedPublication) return;
  
    const token = getCookieValue('jwtToken'); // Retrieve the JWT token from cookies
  
    fetch(`https://localhost:7207/api/Publications/${selectedPublication.id}?UserId=${UserID}`, {
      method: 'DELETE',
      headers: {
        Authorization: `bearer ${token}`, // Include the JWT token in the Authorization header
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete the publication');
      }
      setData(data.filter((pub) => pub.id !== selectedPublication.id));
      setSnackbarMessage('Publication deleted successfully');
      setSnackbarOpen(true);
      handleClose();
    })
    .catch((error) => {
      console.error('Error deleting publication:', error);
      setSnackbarMessage('Error deleting publication');
      setSnackbarOpen(true);
    });
  };
  

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this publication?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper} sx={{ overflowX: "hidden" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID
                <IconButton onClick={toggleSortDirection} size="small">
                  {sortDirection === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                </IconButton>
              </TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderRows(data)}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
