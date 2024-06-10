import React from 'react';
import BaristasList from '../features/baristas/BaristasList';
import CoffeeShopList from '../features/coffeeShop/CoffeeShopList';

export default function MainPage(): JSX.Element {
  return (
    <>
      <video autoPlay muted loop id="myVideo">
        <source src="1.mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <BaristasList />
        <CoffeeShopList />
      </div>
    </>
  );
}
