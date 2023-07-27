import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AccountCircle, PhotoCamera } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';
import { Avatar, Box, Button, Card, CardActionArea, CardContent, Grid, IconButton, TextField } from '@mui/material';

const AccountSettingsPage = ({ details, updateProfilePic }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  useEffect(() => {
    if (details.user && details.user.profilePic) {
      setAvatarUrl(details.user.profilePic);
    }
  }, [details]);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedImage(file);
    }
  };

  const handleImageUpload = async () => {
    try {
      if (!selectedImage) {
        return; // No image selected, do nothing
      }
  
      // Check if selectedImage is already an URL
      if (typeof selectedImage === 'string') {
        // Update the avatarUrl in the frontend state
        setAvatarUrl(selectedImage);
  
        // Update the avatarUrl in the parent component's state
        updateProfilePic(selectedImage);
  
        return;
      }
  
      const formData = new FormData();
      formData.append('image', selectedImage, selectedImage?.name); // Use 'image' as the field name
  
      const response = await axios.patch('http://localhost:5000/api/update', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        // Update the avatarUrl in the frontend state
        setAvatarUrl(response.data.url);
  
        // Update the avatarUrl in the parent component's state
        updateProfilePic(response.data.url);
      }
    } catch (error) {
      console.log('Unable to upload profile picture:', error);
      // Handle upload error
    }
  };
  
  

  const handleSubmitChanges = (event) => {
    event.preventDefault();

    if (!selectedImage) {
      console.log('No image selected');
      // Handle error - No image selected
      return;
    }

    handleImageUpload();
  };

  return (
    <div>
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Card sx={{ minWidth: 500, mt: '5rem' }}>
          <CardContent>
            <Box sx={{ position: 'relative' }}>
            <Avatar sx={{ width: 150, height: 150, mx: 'auto', backgroundColor: 'black' }} src={avatarUrl ? `http://localhost:5000/${avatarUrl}` : ''} />


              <Avatar sx={{ position: 'absolute', zIndex: 100, bottom: 10, right: 155 }}>
                <IconButton color="primary" aria-label="upload picture" component="label">
                  <input hidden accept="image/*" type="file" onChange={handleImageSelect} />
                  <PhotoCamera sx={{ color: 'black' }} />
                </IconButton>
              </Avatar>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
              <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField 
              onChange={(e) => setName(e.target.value)}
              id="input-with-sx" fullWidth variant="standard" value={details.user?.name} />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
              <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                
                id="filled-size-normal"
                fullWidth
                type="email"
                value ={details.user?.email}
                onChange={(e) => setEmail(e.target.value)}
                variant="standard"
              />
            </Box>
          </CardContent>
          <CardActionArea>
            <Button sx={{ my: 2 }} variant="outlined" color="error" onClick={handleSubmitChanges}>
              Submit Changes
            </Button>
          </CardActionArea>
        </Card>
      </Grid>
    </div>
  );
};

export default AccountSettingsPage;
