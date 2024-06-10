import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, type RootState } from '../../store';
import { loadBaristas } from './BaristasSlice';
import BaristaCard from './BaristaCard';
import { loadFavoriteBarista } from '../coffeeShop/CoffeeShopSlice';

function BaristasList(): JSX.Element {
  const baristas = useSelector((state: RootState) => state.barista.BaristasList);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadBaristas());
  }, []);

  useEffect(() => {
    if (user && user?.role === 'coffeeShop') {
      dispatch(loadFavoriteBarista());
    }
  }, [user]);

  return (
    <div className="container ">
      <h1 className="mt-20 mb-20">Бариста</h1>

      <div className="max-w-screen-sm mx-auto mt-2 my-20 mt-2 flex flex-wrap">
        {baristas.map((barista) => (
          <div className="container max-w-xs" key={barista.id}>
            <BaristaCard barista={barista} key={barista.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BaristasList;
