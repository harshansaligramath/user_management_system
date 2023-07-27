import React, { useEffect, useState } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  TextField,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserDetails = () => {
  const [user, setUser] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);


  const sendRequest = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/user-details', {
        withCredentials: true,
      });
      const data = res.data;
      console.log('Response data:', data);
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  };
  const addUser = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/admin/addUser',
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      const data = res.data;
      console.log('Add User Response:', data);

      if (data && data.user) {
        setUser((prevUsers) => [...prevUsers, data.user]);
        setSuccessMessage('User added successfully!'); // Set success message
      } else {
        console.log('Invalid server response:', data);
      }

      setOpenModal(false);
      setName('');
      setEmail('');
      setPassword('');

      // Fetch user details again after adding a user
      sendRequest().then((data) => {
        if (data) {
          setUser(data.user);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  //search
  const handleSearch = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/admin/search',
        { search: searchQuery || '' },
        { withCredentials: true }
      );
      const data = res.data;
      console.log('Search Results:', data);
  
      if (data && data.users) {
        setUser(data.users);
      } else {
        console.log('Invalid server response:', data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  //delete
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/deleteUser/${id}`, {
        withCredentials: true,
      });
      setSuccessMessage('User deleted successfully!'); // Set success message

      // Fetch user details again after deleting a user
      sendRequest().then((data) => {
        if (data) {
          setUser(data.user);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  
  const handleDeleteClick = (id) => {
    setSelectedUserId(id);
    setOpenConfirmationDialog(true);
  };

  const handleConfirmDelete = () => {
    deleteUser(selectedUserId);
    setOpenConfirmationDialog(false);
  };

  const handleCancelDelete = () => {
    setOpenConfirmationDialog(false);
  };

  useEffect(() => {
    sendRequest().then((data) => {
      if (data) {
        setUser(data.user);
      }
    });
  }, []);


 
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Search Bar */}
      <FormControl fullWidth sx={{ width: '500px', marginBottom: '10px', marginTop: '10px' }}>
        {/* Search Input */}
        <InputLabel htmlFor="search-input">Search Users</InputLabel>
        <Input
          id="search-input"
          value={searchQuery}
          onChange={(e) => {setSearchQuery(e.target.value) 
             handleSearch()}}
          endAdornment={
            <InputAdornment position="end">
              <Button variant="contained" size="small" onClick={handleSearch}>
                Search
              </Button>
            </InputAdornment>
          }
        />
      </FormControl>
      {/* Add User Button */}
      <Button variant="contained" color="success" onClick={() => setOpenModal(true)} style={{ marginTop: '10px' }}>
        Add User
      </Button>

      {/* User Table */}
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          {/* Table Head */}
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          {/* Table Body */}
          <TableBody>
            {user.length > 0 ? (
              user.map((res) => (
                <TableRow key={res._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {res.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {res.email}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Button variant="contained" component={Link} to={`/admin/user-details/${res._id}`}>
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {/* Delete Button */}
                    <Button variant="outlined" color="error" onClick={() => handleDeleteClick(res._id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openConfirmationDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are you sure you want to delete this user?</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleConfirmDelete}>
            Delete
          </Button>
          <Button variant="outlined" onClick={handleCancelDelete}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add User Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        {/* Modal Content */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#ffffff',
            padding: '20px',
            outline: 'none',
          }}
        >
          {successMessage && (
            <Typography variant="body1" style={{ marginBottom: '10px', color: 'green' }}>
              {successMessage}
            </Typography>
          )}
          <Typography variant="h6" gutterBottom>
            Add User
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Name Input */}
            <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
            {/* Email Input */}
            <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {/* Password Input */}
            <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {/* Submit Button */}
            <Button variant="contained" onClick={addUser}>
              Submit
            </Button>
          </Box>
        </div>
      </Modal>
    </div>
  );

};

export default UserDetails;
