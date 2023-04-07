import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authenticated: (state) => {
      state.isAuth = true;
    },
    logout: (state) => {
      state.isAuth = false;
    },
  },
});

export const { authenticated, logout } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
