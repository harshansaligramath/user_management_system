// adminSlice.js
import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: { isLoggedIn: localStorage.getItem('adminIsLoggedIn') === 'true' },
  reducers: {
    adminLogin: (state) => {
      state.isLoggedIn = true;
      localStorage.setItem('adminIsLoggedIn', 'true');
    },
    adminLogout: (state) => {
      state.isLoggedIn = false;
      localStorage.setItem('adminIsLoggedIn', 'false');
    },
  },
});

export const { adminLogin, adminLogout } = adminSlice.actions;
export default adminSlice.reducer;
