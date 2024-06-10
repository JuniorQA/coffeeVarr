/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as api from './api';

import type Ratings from './State';

const initialState: Ratings = {
  RatingList: [],
};

export const saveRating = createAsyncThunk(
  '/rating/save',
  (NewRating: number, baristaId: number, userId: number) =>
    api.fetchsaveRating(NewRating, baristaId, userId),
);

const RatingSlice = createSlice({
  name: 'RatingSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(saveRating.fulfilled, (state, action) => {
      state.RatingList.push(action.payload);
    });
  },
});
export default RatingSlice.reducer;
