import React from 'react';
import { Outlet } from 'react-router';
import Menu from '../features/menu/Menu';

export default function MenuLayout(): JSX.Element {
  return (
    <>
      <Menu />
      <Outlet />
    </>
  );
}
