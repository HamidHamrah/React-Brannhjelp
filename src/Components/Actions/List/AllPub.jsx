import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate from React Router


export default function Read() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const UserID = 'Hamid'; // This should dynamically set after implementing authentication
  const navigate = useNavigate(); // Using useNavigate hook
  
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
    // Correct use of template literals with backticks and placeholders
    navigate(`/update/${id}?UserId=${UserID}`);
  };


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
        {/* Dialog content */}
      </Dialog>
      <table>
        <thead>
          <tr>
            <th>
              ID
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
                <Button onClick={() => handleUpdate(item.id)} style={{ marginRight: '10px' }}>Update</Button>
                <Button onClick={() => handleDelete(item.id)} color="error">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
    
}
