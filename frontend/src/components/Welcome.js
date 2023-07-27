import React, { useEffect, useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const Welcome = () => {
  const [user, setUser] = useState(null);

  const sendRequest = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/user', {
        withCredentials: true
      });
      const data = res.data; // Perform null check before accessing data property
      console.log('data==>',data)
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  useEffect(() => {
    sendRequest().then(data => {
      if (data) {
        setUser(data.user);
      }
    });
  }, []);

  return (
    <div>
      {user && <h1>Welcome, {user.name}!</h1>}
    </div>
  );
};

export default Welcome;
