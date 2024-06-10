// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import type AuthState from './AuthState';
// import * as api from './api';
// import type User from './User';

// const initialState: AuthState = {
//   user: null,
// };

// export const logUser = createAsyncThunk('user/reg', (newUser: User) => {
//   return api.logUserOnServer(newUser);
// });
// export const logUser = createAsyncThunk('user/reg', (newUser: User) => api.regUserOnServer(newUser));


// const UserSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(regUser.fulfilled, (state, action) => {
//       state.user = action.payload;
//     });
//   },
// });

// export default UserSlice.reducer;
