import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import adminReducer from './adminSlice';

const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
});

export default rootReducer;
