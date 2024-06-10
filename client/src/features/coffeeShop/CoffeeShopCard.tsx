import React from 'react';
import { Link } from 'react-router-dom';
import type CoffeeShop from './CoffeeShop';

type CoffeeShopPropsType = {
  coffeeShop: CoffeeShop;
};
function CoffeeShopCard({ coffeeShop }: CoffeeShopPropsType): JSX.Element {
  // const isFavorite = useMemo(() => favorites.find((v) => v.id === vacancy.id), [favorites]);
  return (
    <div className="container flex items-center flex-column gap-3 shadow-2xl rounded-2xl min-h-300 m-10">
      <Link to={`/coffeeShop/${coffeeShop.id}`}>
        <img className="rounded-2xl" style={{ maxHeight: '250px' }} src={coffeeShop.photo} alt="" />
      </Link>
      <h2>
        <strong>{coffeeShop.shopName}</strong>
      </h2>
      <p>
        <strong>Меню: </strong>
        {coffeeShop.menu}
      </p>
    </div>
  );
}

export default CoffeeShopCard;
