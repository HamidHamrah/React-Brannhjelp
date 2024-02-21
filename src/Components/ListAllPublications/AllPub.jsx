import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function Read() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' for ascending, 'desc' for descending
  const UserID = 'Hamid'; // This should dynamically set after implementing authentication


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
    if (sortDirection === 'asc') {
      return a.id - b.id;
    } else {
      return b.id - a.id;
    }
  });


  const handleClickOpen = (id) => {
    // Fetch the publication's details with UserId
    fetch(`https://localhost:7207/api/Publications/${id}?UserId=${UserID}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedPublication(data);
        setOpen(true);
      })
      .catch((error) => console.error('Error fetching publication details:', error));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    if (!selectedPublication) return;

    fetch(`https://localhost:7207/api/Publications/${selectedPublication.id}?UserId=${UserID}`, {
      method: 'DELETE'
    })
      .then(() => {
        setData(data.filter((item) => item.id !== selectedPublication.id));
        setOpen(false);
      })
      .catch((error) => console.error('Error deleting publication:', error));
  };

  
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Publication</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this publication?
          <p>ID: {selectedPublication?.id}</p>
          <p>Title: {selectedPublication?.title}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
      <table>
        <thead>
          <tr>
            <th>ID
              <Button onClick={toggleSortDirection} size="small">
                {sortDirection === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
              </Button>
            </th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>
                <Button style={{ marginRight: '10px' }}>Update</Button>
                <Button onClick={() => handleClickOpen(item.id)} color="error">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
