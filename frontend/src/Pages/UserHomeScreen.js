import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Welcome from '../components/Welcome'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

const UserHomeScreen = () => {

  const isLoggedIn = useSelector(state=>state.user.isLoggedIn)
  console.log(isLoggedIn)
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

  if (!details.user) {
    // User details not available, show loading or redirect to login
    return null;
  }

  return (
    <>
    <Header details={details}/>
   
      <Welcome />
        
    </>
  )
}

export default UserHomeScreen