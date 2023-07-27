import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const UserPrivateRoute = () => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
}

export default UserPrivateRoute