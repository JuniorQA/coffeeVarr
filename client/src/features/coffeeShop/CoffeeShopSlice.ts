/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as api from './api';
import type CoffeeShopState from './State';
import type { CoffeeUpdate } from './CoffeeShop';

const initialState: CoffeeShopState = {
  CoffeeShopList: [],
  CurrentCoffeeShop: null,
  CoffeUpdate: undefined,
  favorites: [],
};

export const loadCoffeeShop = createAsyncThunk('coffeeShop/load', () => api.fetchLoadCoffeeShop());

export const updateCoffeShop = createAsyncThunk('coffeshop/update', (updatecoffe: CoffeeUpdate) => {
  return api.fetchUpdateCoffeeShop(updatecoffe);
});


export const updatePhoto = createAsyncThunk('coffeShop/update/update', (selectedFile) =>
  api.fetchUpdatePhoto(selectedFile),
);

export const LoadCoffeeShopProfile = createAsyncThunk('coffeeShop/profile', () =>
  api.fetchLoadCoffeeShopProfile(),
);
export const saveToFavoriteBarista = createAsyncThunk('coffeeShop/favorite/save', (id: number) =>
  api.saveToFavorites(id),
);
export const loadFavoriteBarista = createAsyncThunk('coffeeShop/favorite/load', () =>
  api.fetchloadFavoriteBarista(),
);
export const removeFromFavoriteBarista = createAsyncThunk(
  'coffeeShop/favorite/remove',
  (id: number) => api.removeFromFavorites(id),
);

const CoffeeShopSlice = createSlice({
  name: 'coffeeShops',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updatePhoto.fulfilled, (state, action) => {
      state.CurrentCoffeeShop = action.payload;
    });
    builder.addCase(loadCoffeeShop.fulfilled, (state, action) => {
      state.CoffeeShopList = action.payload;
    });
    builder.addCase(updateCoffeShop.fulfilled, (state, action) => {
      state.CurrentCoffeeShop = action.payload;

    });
    builder.addCase(LoadCoffeeShopProfile.fulfilled, (state, action) => {
      state.CurrentCoffeeShop = action.payload;
    });
    builder.addCase(loadFavoriteBarista.fulfilled, (state, action) => {
      state.favorites = action.payload;
    });
    builder.addCase(saveToFavoriteBarista.fulfilled, (state, action) => {
      state.favorites.push(action.payload);
    });
    builder.addCase(removeFromFavoriteBarista.fulfilled, (state, action) => {
      state.favorites = state.favorites.filter((el) => el.id !== action.payload);
    });
  },
});
export default CoffeeShopSlice.reducer;
