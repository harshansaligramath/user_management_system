// AdminLogin.js
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { adminLogin } from '../../slices/adminSlice';

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const sendRequest = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', {
        email: inputs.email,
        password: inputs.password,
      });
      const data = res.data;
      dispatch(adminLogin());
      localStorage.setItem('adminIsLoggedIn', JSON.stringify(true));
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminIsLoggedIn') === 'true';
    if (isLoggedIn) {
      dispatch(adminLogin());
    }
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then((data) => {
        navigate('/admin/profile');
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || err.message);
      });
  };

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <Box
            marginLeft="auto"
            marginRight="auto"
            width={300}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h3">Admin Login</Typography>
            <TextField
              onChange={handleChange}
              name="email"
              type="email"
              value={inputs.email}
              margin="normal"
              variant="outlined"
              placeholder="Email"
            />
            <TextField
              onChange={handleChange}
              name="password"
              type="password"
              value={inputs.password}
              margin="normal"
              variant="outlined"
              placeholder="Password"
            />
            <Button variant="contained" type="submit">
              Login
            </Button>
          </Box>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;