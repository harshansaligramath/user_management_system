import React, { useState } from 'react';
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { adminLogout } from '../../slices/adminSlice';

axios.defaults.withCredentials = true;

const AdminHeaders = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const [value, setValue] = useState(null);
  const sendLogoutReq = async () => {
    const res = await axios.post('http://localhost:5000/api/admin/logout', null, {
      withCredentials: true,
    });
    if (res.status === 200) {
      return res;
    }
    return new Error('Unable to Logout');
  };

  const handleLogout = () => {
    sendLogoutReq()
      .then(() => dispatch(adminLogout()))
      .catch((err) => console.log(err)); // Handle logout error if needed
  };

  const handleChangeTab = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h4">
          <Link to="/admin/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
            ADMIN PANEL
            </Link>
            </Typography>
          <Box sx={{ marginLeft: 'auto' }}>
            <Tabs
              indicatorColor="secondary"
              onChange={handleChangeTab}
              value={value}
              textColor="inherit"
            >
              {!isLoggedIn && (
                <>
                  <Tab to="/admin/login" component={Link} label="Login" />
                 
                </>
              )}
              {isLoggedIn && (
                <>
                <Tab  to="/admin/user-details" component={Link} label="User Details" />
                <Tab onClick={handleLogout} to="/admin/login" component={Link} label="Logout" /></>
              )}
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AdminHeaders;
