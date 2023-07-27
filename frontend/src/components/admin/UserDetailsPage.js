import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminHeaders from './AdminHeaders';
import { Box, Button, Card, CardContent, Grid, TextField, Typography, Snackbar } from '@mui/material';

const UserDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/admin/user-details/${id}`, {
          withCredentials: true,
        });
        const data = res.data;
        console.log('User details:', data);
        setUser(data);
        setName(data.userDetails.name);
        setEmail(data.userDetails.email);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleSubmit = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/admin/editUser/${id}`,
        { name, email },
        {
          withCredentials: true,
        }
      );
      console.log('Changes saved:', res.data);
      setShowSnackbar(true);
      setShowSaveMessage(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const handleGoBack = () => {
    navigate('/admin/profile');
  };

  if (!user) {
    return <p>No user details found.</p>;
  }

  return (
    <div>
      <AdminHeaders />
      <Grid container justifyContent="center" alignItems="center">
        <Card variant="outlined" sx={{ width: 400, mt: '8rem' }}>
          <CardContent>
            <Typography variant="h5" component="h1" align="center" gutterBottom>
              User Details
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2 }}>
              <TextField id="name" label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2 }}>
              <TextField id="email" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
              <Button variant="contained" color="primary" onClick={handleGoBack}>
                Go Back to Home
              </Button>
              <Button variant="contained" color="success" onClick={handleSubmit}>
                Submit Changes
              </Button>
            </Box>
            {showSaveMessage && (
              <Typography variant="body2" color="textSecondary" align="center">
                Changes saved successfully
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
      <Snackbar open={showSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose} message="Changes saved successfully" />
    </div>
  );
};

export default UserDetailsPage;
