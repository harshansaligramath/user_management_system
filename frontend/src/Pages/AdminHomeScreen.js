import React from 'react'
import AdminHeaders from '../components/admin/AdminHeaders'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AdminWelcome from '../components/admin/AdminWelcome'


const AdminHomeScreen = () => {
  const isLoggedIn = useSelector(state=>state.admin.isLoggedIn)
  console.log('admin home====',isLoggedIn)
  console.log(isLoggedIn)
  const PrivateRoute = () => {
    const isLoggedIn = useSelector((state) => state.admin.isLoggedIn);
    return isLoggedIn ? <AdminWelcome /> : <Navigate to='/admin/login' replace />;
  };
  return (
    <>
    <AdminHeaders/>
    <Routes>
    <Route path='' element={<PrivateRoute />}/>
        <Route path='/admin/profile' element={<AdminWelcome />} />
        </Routes>
    </>
  )
}

export default AdminHomeScreen