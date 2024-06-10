/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type BaristaState from './State';
import * as api from './api';
import type { FreeDate } from '../calendar/FreeDate';
import { NewBarista } from './Baristas';

const initialState: BaristaState = {
  BaristasList: [],
  CurrentBarista: null,
  freeDates: [],
};

export const updateBarista = createAsyncThunk('barista/update', (updatebarista: NewBarista) => {
  return api.fetchUpdateBarista(updatebarista);
});

export const loadBaristas = createAsyncThunk('baristas/load', () => api.fetchLoadBaristas());

export const LoadBaristaProfile = createAsyncThunk('barista/profile', (id: number) =>
  api.fetchLoadBaristaProfile(id),
);

// newFeatures

export const updatePhotoBarista = createAsyncThunk('barista/update/update', (selectedFile) =>
  api.fetchUpdatePhotoBarista(selectedFile),
);

export const saveToFreeDateBarista = createAsyncThunk('barista/freeDate/save', (date: Date) =>
  api.saveToFreeDates(date),
);
export const loadFreeDatesBarista = createAsyncThunk('barista/freeDate/load', () =>
  api.loadFreeDates(),
);
export const removeFreeDateBarista = createAsyncThunk(
  'coffeeShop/favorite/remove',
  (id: FreeDate['id']) => api.removeFromDates(id),
);

const BaristaSlice = createSlice({
  name: 'baristas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateBarista.fulfilled, (state, action) => {
      state.CurrentBarista = action.payload;
    });
    builder.addCase(updatePhotoBarista.fulfilled, (state, action) => {
      state.CurrentBarista = action.payload;
    });
    builder.addCase(loadBaristas.fulfilled, (state, action) => {
      state.BaristasList = action.payload;
    });
    builder.addCase(LoadBaristaProfile.fulfilled, (state, action) => {
      state.CurrentBarista = action.payload;
    });
    builder.addCase(saveToFreeDateBarista.fulfilled, (state, action) => {
      state.freeDates.push(action.payload);
    });
    builder.addCase(loadFreeDatesBarista.fulfilled, (state, action) => {
      state.freeDates = action.payload;
    });
    builder.addCase(removeFreeDateBarista.fulfilled, (state, action) => {
      state.freeDates = state.freeDates.filter((el) => el.id !== action.payload);
    });
  },
});
export default BaristaSlice.reducer;
