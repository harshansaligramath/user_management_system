import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import AccountSettingsPage from './AccountSettingsPage';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
  const [details, setDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/user', {
      withCredentials: true
    })
      .then((res) => {
        setDetails(res.data);
      })
      .catch(error => {
        navigate('/');
      });
  }, []);

  const updateProfilePic = (filePath) => {
    setDetails(prevDetails => ({
      ...prevDetails,
      user: {
        ...prevDetails.user,
        profilePic: filePath
      }
    }));
  };

  if (!details.user) {
    // User details not available, show loading or redirect to login
    return null;
  }

  return (
    <>
      <Header details={details} />
      <AccountSettingsPage details={details} updateProfilePic={updateProfilePic} />
    </>
  );
};

export default UserProfile;
