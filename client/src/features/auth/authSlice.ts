/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './api';
import type AuthState from './AuthState';
import type { UserLocale } from './User';

const initialState: AuthState = {
  user: undefined,
  error: null,
};

export const checkuser = createAsyncThunk('check/user', () => api.fetchCheckUser());

export const logUser = createAsyncThunk(
  'user/login',
  (user: { email: string; password: string }): Promise<UserLocale> => api.fetchLogUser(user),
);
export const logoutUser = createAsyncThunk('user/logout', () => {
  api.fetchLogoutUser();
});

const authSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(logUser.rejected, (state, action) => {
      console.error(action.error.message);
      state.error = action.error.message ? action.error.message : 'Ошибка сервера';
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = undefined;
      state.error = null;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      console.error(action.error.message);
      state.error = action.error.message ? action.error.message : 'Ошибка сервера';
    });
    builder.addCase(checkuser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.error = null;
    });
    builder.addCase(checkuser.rejected, (state, action) => {
      console.error(action.error.message);
      state.error = action.error.message ? action.error.message : 'Ошибка сервера';
    });
  },
});
export default authSlice.reducer;
