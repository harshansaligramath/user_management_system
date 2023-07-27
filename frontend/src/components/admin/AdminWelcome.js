import React, { useEffect, useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const AdminWelcome = () => {
  const [user, setUser] = useState(null);
  console.log(user)

  const sendRequest = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/profile', {
        withCredentials: true
      });
      const data = res.data;
      console.log('Response data:', data);
      
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  useEffect(() => {
    sendRequest().then((data) => {
      if (data) {
        setUser(data.admin);
      }
    });
  }, []);
  return (
    <div>
    {localStorage.getItem('adminIsLoggedIn') === 'true' && (
      <h1>Welcome, {user && user.name}!</h1>
    )}
  </div>
  );
};

export default AdminWelcome;
