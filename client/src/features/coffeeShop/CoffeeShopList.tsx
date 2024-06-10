import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, type RootState } from '../../store';
import { loadCoffeeShop } from './CoffeeShopSlice';
import CoffeeShopCard from './CoffeeShopCard';

function CoffeeShopList(): JSX.Element {
  const coffeshops = useSelector((state: RootState) => state.coffeeShop.CoffeeShopList);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadCoffeeShop());
  }, []);

  return (
    <div className="container">
      <h1 className="mt-20 mb-20">Кофейни</h1>
      <div className="max-w-screen-sm mx-auto mt-2 my-20 mt-2 flex flex-wrap">
        {coffeshops.map((coffeeShop) => (
          <div className="container max-w-xs" key={coffeeShop.id}>
            <CoffeeShopCard coffeeShop={coffeeShop} key={coffeeShop.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoffeeShopList;
