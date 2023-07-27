import React, { useState } from 'react';
import { AppBar, Box, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logout } from '../slices/userSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleIcon from '@mui/icons-material/AddCircle';

axios.defaults.withCredentials = true;

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const sendLogoutReq = async () => {
    const res = await axios.post('http://localhost:5000/api/logout', null, {
      withCredentials: true,
    });
    if (res.status === 200) {
      return res;
    }
    return new Error('Unable to Logout');
  };

  const handleLogout = () => {
    sendLogoutReq()
      .then(() => dispatch(logout()))
      .catch((err) => console.log(err)); // Handle logout error if needed
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
       
        <Typography variant="h3">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              User Management
            </Link>
        </Typography>
       
          
          <Box sx={{ marginLeft: 'auto' }}>
            {isLoggedIn ? (
              <>
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  aria-label="account"
                  aria-controls="account-menu"
                  aria-haspopup="true"
                  onClick={handleMenuOpen}
                >
                  <AccountCircleIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleMenuClose}
                  onClick={handleMenuClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                   <MenuItem component={Link} to="/account-settings">
                    <ListItemIcon>
                      <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    Account Settings
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                 
                </Menu>
              </>
            ) : (
              <>
              <Tooltip title="Login">
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  component={Link}
                  to="/"
                  aria-label="login"
                >
                  <AccountCircleIcon />
                </IconButton>
                </Tooltip>
                <Tooltip title="Sign Up">
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  component={Link}
                  to="/signup"
                  aria-label="signup"
                >
                  <AddCircleIcon />
                </IconButton>
                </Tooltip>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
