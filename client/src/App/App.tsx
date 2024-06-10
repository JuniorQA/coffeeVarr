import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import { useSelector } from 'react-redux';
import Main from './MainPage';
import Layout from './Layout';

import { checkuser } from '../features/auth/authSlice';
import type { RootState } from '../store';
import { useAppDispatch } from '../store';

import BaristaProfilePage from '../features/baristas/BaristaProfilePage';
import Calend from '../features/calendar/Calend';
import CoffeeShopProfile from '../features/coffeeShop/Profile';
import BaristasList from '../features/baristas/BaristasList';
import CoffeeShopList from '../features/coffeeShop/CoffeeShopList';
import NewsArticles from '../features/news/NewsArticles';
import MenuLayout from './MenuLayout';
import BaristaDeepCardPage from '../features/baristas/BaristaDeepCardPage';
import CoffeeShopDeepCardPage from '../features/coffeeShop/CoffeeShopDeepCardPage';
import Page404 from './Page404';
import { LoadBaristaProfile } from '../features/baristas/BaristasSlice';
import { LoadCoffeeShopProfile } from '../features/coffeeShop/CoffeeShopSlice';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useSelector((store: RootState) => store.auth.user);
  useEffect(() => {
    if (user && user.role === 'barista') {
      void dispatch(LoadBaristaProfile(user.id));
    } else if (user && user.role === 'coffeeShop') {
      void dispatch(LoadCoffeeShopProfile(user.id));
    }

    
  }, [user]);
  useEffect(() => {
    dispatch(checkuser());
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<MenuLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/calendar" element={<Calend />} />
          <Route path="/baristas" element={<BaristasList />} />
          <Route path="/coffeshop" element={<CoffeeShopList />} />
          <Route path="/news" element={<NewsArticles />} />
        </Route>
        <Route path="/baristaProfile" element={<BaristaProfilePage />} />
        <Route path="/coffeeShopProfile" element={<CoffeeShopProfile />} />
        <Route path="/baristas/:baristaId" element={<BaristaDeepCardPage />} />
        <Route path="/coffeeShop/:coffeeShopId" element={<CoffeeShopDeepCardPage />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
}

export default App;
