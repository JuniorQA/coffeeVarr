import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { type RootState, useAppDispatch } from '../../store';
import { loadFavoriteBarista } from './CoffeeShopSlice';
import FavCard from './FavCard';

function CoffeeShopFavorites(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadFavoriteBarista());
  }, []);
  const baristas = useSelector((state: RootState) => state.coffeeShop.favorites);
  console.log(baristas);

  return (
    <>
      <h1>Избранные баристы</h1>
      <div className="max-w-screen-sm mx-auto mt-2 my-20 mt-2 flex flex-col">
        {baristas.length > 0 ? (
          baristas.map((barista) => (
            <div className="container max-w-xs">
              <FavCard barista={barista} key={barista.id} />
            </div>
          ))
        ) : (
          <p>Тут еще пусто</p>
        )}
      </div>
    </>
  );
}

export default CoffeeShopFavorites;
