import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserLoginScreen from './Pages/UserLoginScreen';
import UserHomeScreen from './Pages/UserHomeScreen';
import UserRegister from './Pages/UserRegister';
import AdminLoginScreen from './Pages/AdminLoginScreen';
import AdminUserDetails from './Pages/AdminUserDetails';
import AdminHomeScreen from './Pages/AdminHomeScreen'
import UserDetailsPage from './components/admin/UserDetailsPage';
import UserProfile from './Pages/UserProfile';
import AdminPrivateRoute from './Routes/AdminPrivateRoute';
import UserPrivateRoute from './Routes/UserPrivateRoute';
import AdminPublicRoute from './Routes/AdminPublicRoute';
import PublicRoutes from './Routes/PublicRoutes';

function App() {
 
  return (
    <>
      <ToastContainer />
      <main>
        <Routes>

        <Route element={<PublicRoutes/>}>
          <Route path="/" element={<UserLoginScreen />} />
          <Route path="/signup" element={<UserRegister />} />
          </Route>
          <Route element={<UserPrivateRoute/>}>
          <Route path='/user' element={<UserHomeScreen />} />
          <Route path="/account-settings" element={<UserProfile/>} />
         </Route>
         

          <Route element={<AdminPublicRoute/>}>
          <Route path="/admin/login" element={<AdminLoginScreen />} />
          </Route>
          <Route element={<AdminPrivateRoute/>}>
          <Route path="/admin/profile" element={<AdminHomeScreen />} />
          <Route path="/admin/user-details" element={<AdminUserDetails />} />
          <Route path="/admin/user-details/:id" element={<UserDetailsPage />} />
          </Route>
          
        </Routes>
      </main>
    </>
  );
}

export default App;
