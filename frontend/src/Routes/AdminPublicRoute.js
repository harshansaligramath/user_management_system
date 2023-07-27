import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminPublicRoute = () => {
    const isLoggedIn = useSelector((state) => state.admin.isLoggedIn);
    return !isLoggedIn ? <Outlet /> : <Navigate to='/admin/profile' replace />;
}

export default AdminPublicRoute