/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BiSolidCoffeeBean } from 'react-icons/bi';
import { CiCoffeeBean } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { useAppDispatch, type RootState } from '../../store';
import type { Barista } from './Baristas';
import { removeFromFavoriteBarista, saveToFavoriteBarista } from '../coffeeShop/CoffeeShopSlice';
import Rating from '../rating/Rating.tsx';
// import * as api from './api';

type BaristaPropsType = {
  barista: Barista;
};
function BaristaCard({ barista }: BaristaPropsType): JSX.Element {
  const favorites = useSelector((store: RootState) => store.coffeeShop.favorites);

  const user = useSelector((state: RootState) => state.auth.user);
  // const user = useSelector((store: RootState) => store.auth.user);
  const dispatch = useAppDispatch();
  const isFavorite = useMemo(() => favorites.find((v) => v.id === barista.id), [favorites]);
  // const [showWarning, setShowWarning] = useState(false);

  const handleRemoveFromFavorites = async (id: Barista['id']): Promise<void> => {
    dispatch(removeFromFavoriteBarista(id));
  };

  const handleAddToFavorites = async (id: Barista['id']): Promise<void> => {
    dispatch(saveToFavoriteBarista(id));
  };

  // const closeModal = useCallback(() => setShowWarning(false), []);
  return (
    <div
      className="container flex items-center flex-column gap-3 shadow-2xl rounded-2xl"
      key={barista.id}
    >
      <Link to={`/baristas/${barista.id}`}>
        <img className="rounded-2xl" style={{ maxHeight: '250px' }} src={barista.photo} alt="" />
      </Link>
      <p className="mb-8">
        {barista.baristaFirstName} {barista.baristaLastName}
      </p>

      {user?.role === 'coffeeShop' &&
        (isFavorite ? (
          <>
            <BiSolidCoffeeBean
              size={50}
              onClick={() => handleRemoveFromFavorites(barista.id)}
              className="w-8 ml-2 cursor-pointer"
            />
            <Rating />
          </>
        ) : (
          <>
            <CiCoffeeBean
              size={50}
              className="w-8 ml-2 cursor-pointer"
              onClick={() => handleAddToFavorites(barista.id)}
            />
            <Rating />
          </>
        ))}
    </div>
  );
}

export default BaristaCard;
