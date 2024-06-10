import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useAppDispatch, type RootState } from '../../store';
import { LoadCoffeeShopProfile, loadCoffeeShop } from './CoffeeShopSlice';
import type CoffeeShop from './CoffeeShop';
import MapComponent from '../yaMap/mapComponent';

function CoffeeShopDeepCardPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const CoffeeShopList = useSelector((state: RootState) => state.coffeeShop.CoffeeShopList);
  const { coffeeShopId } = useParams();
  useEffect(() => {
    dispatch(loadCoffeeShop());
    dispatch(LoadCoffeeShopProfile());
  }, []);
  let CoffeeShop: CoffeeShop | undefined;

  if (coffeeShopId) {
    CoffeeShop = CoffeeShopList.find((v) => v.id === +coffeeShopId);
  }

  return (
    <div className="ProfilePage text-xl border-2 px-5 py-5 rounded-lg">
      <div className="ProfileDesc flex flex-col w-3/6 justify-start text-start">
        <div className="flex my-2 flex-col">
          <img className="rounded-2xl shadow-2xl" src={`${CoffeeShop?.photo}`} alt="" />
        </div>
        <div className="flex my-4">
          <p className=" font-bold mx-4">Адрес </p>
          <p className="">{CoffeeShop?.address}</p>
        </div>
        <div className="flex my-4">
          <p className=" font-bold mx-4">Город </p>
          <p className="">{CoffeeShop?.city}</p>
        </div>
        <div className="flex flex-column gap-2 my-2 w-min rounded-2xl shadow-2xl">
          <p className=" font-bold mx-4">Карта</p>
          <MapComponent address={`${CoffeeShop?.city}, ${CoffeeShop?.address}`} />
        </div>
        <div className="flex my-4">
          <p className=" font-bold mx-4">Описание </p>
          <p className="">{CoffeeShop?.description}</p>
        </div>
        <div className="flex my-4">
          <p className=" font-bold mx-4">Меню </p>
          <p className="">{CoffeeShop?.menu}</p>
        </div>
      </div>
    </div>
  );
}

export default CoffeeShopDeepCardPage;
