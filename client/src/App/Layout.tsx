import React from 'react';
import { Outlet } from 'react-router';
import Header from './Header';
// import Menu from '../features/menu/Menu';

export default function Layout(): JSX.Element {
  return (
    <div className="content">
      <Header />
      {/* <Menu /> */}
      <Outlet />
    </div>
  );
}
