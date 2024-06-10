import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authSlice from './features/auth/authSlice';
import BaristasSlice from './features/baristas/BaristasSlice';
import CoffeeShopSlice from './features/coffeeShop/CoffeeShopSlice';
import MessageSlice from './features/messages/MessageSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    barista: BaristasSlice,
    coffeeShop: CoffeeShopSlice,
    message: MessageSlice,
  },
});
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
export default store;
