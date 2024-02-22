import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton 
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
  const UserID = 'Hamid'; // Placeholder for user ID
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://localhost:7207/api/Publications')
      .then((response) => response.json())
      .then(setData)
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const sortedData = [...data].sort((a, b) => {
    return sortDirection === 'asc' ? a.id - b.id : b.id - a.id;
  });

  const handleUpdate = (id) => {
    navigate(`/update/${id}?UserId=${UserID}`);
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

    fetch(`https://localhost:7207/api/Publications/${selectedPublication.id}?UserId=${UserID}`, {
      method: 'DELETE',
    })
    .then(() => {
      setData(data.filter((item) => item.id !== selectedPublication.id));
      handleClose();
    })
    .catch((error) => console.error('Error deleting publication:', error));
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
      <TableContainer component={Paper}>
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
            {sortedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleUpdate(item.id)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleClickOpen(item)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
