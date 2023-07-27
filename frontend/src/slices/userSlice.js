// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { isLoggedIn: sessionStorage.getItem('userLoggedIn') === 'true' },
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
      sessionStorage.setItem('userLoggedIn', 'true');
    },
    logout: (state) => {
      state.isLoggedIn = false;
      sessionStorage.setItem('userLoggedIn', 'false');
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
