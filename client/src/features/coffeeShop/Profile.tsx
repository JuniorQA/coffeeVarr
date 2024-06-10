import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaPencil } from 'react-icons/fa6';
import { useAppDispatch, type RootState } from '../../store';
import { LoadCoffeeShopProfile, updateCoffeShop, updatePhoto } from './CoffeeShopSlice';
import MapComponent from '../yaMap/mapComponent';
import CoffeeShopFavorites from './CoffeeShopFavorites';
import type { CoffeeUpdate } from './CoffeeShop';
import CoffeeShop from './CoffeeShop';
// import { fetchLoadBaristaProfile } from './api';
// import { useParams } from 'react-router';

function CoffeeShopProfile(): JSX.Element {
  const dispatch = useAppDispatch();
  const CurrentCoffeeShop = useSelector((state: RootState) => state.coffeeShop.CurrentCoffeeShop);

  const [isEditingShopName, setIsEditingShopName] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingMenu, setIsEditingMenu] = useState(false);
  const [isEditingCity, setIsEditingCity] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const [name, setName] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [address, setAdress] = useState<string>('');
  const [menu, setMenu] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [showPhotoForm, setShowPhotoForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    dispatch(LoadCoffeeShopProfile());
  }, []);

  useEffect(() => {
    if (CurrentCoffeeShop) {
      setCity(CurrentCoffeeShop.city);
      setAdress(CurrentCoffeeShop.address);
      setName(CurrentCoffeeShop.shopName);
      setDescription(CurrentCoffeeShop.description);
      setMenu(CurrentCoffeeShop.menu);
    }
  }, [CurrentCoffeeShop]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const obj: CoffeeUpdate = {
      shopName: name,
      city,
      description,
      address,
      menu,
      id: CurrentCoffeeShop!.id,
    };
    const dispatchResult = await dispatch(updateCoffeShop(obj));

    if (updateCoffeShop.fulfilled.match(dispatchResult)) {
      setIsEditingDescription(false);
      setIsEditingShopName(false);
      setIsEditingAddress(false);
      setIsEditingCity(false);
      setIsEditingMenu(false);
    }

    // const dispatchResult = await dispatch(logUser({ email, password }));
    // if (logUser.fulfilled.match(dispatchResult)) {
    //   setIsEditingDescription(false);
    // }
  };

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files[0];
  //   // dispatch(uploadPhoto(file));
  // };

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file: File | null = event.target.files ? event.target.files[0] : null;
  // };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handlePhotoUpload = async (): Promise<void> => {
    if (selectedFile) {
      try {
        // const updatedUser = await api.updatePhoto(selectedFile);
        // dispatch({ type: 'user/updateInfo', payload: updatedUser });
        dispatch(updatePhoto(selectedFile));
        setShowPhotoForm(false);
      } catch (error) {
        console.error(error);
      }
    }
    console.log(CurrentCoffeeShop);
  };
  return (
    <div className="ProfilePage text-xl border-2 px-5 py-5 rounded-lg">
      <div className="flex my-2 flex-col">
        <img src={CurrentCoffeeShop?.photo} className="rounded-2xl shadow-2xl" alt="" srcSet="" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="ProfilePage text-xl  flex">
          <div className="ProfileDesc flex flex-col w-3/6 justify-start text-start">
            <div className="flex my-4">
              <p className=" font-bold mx-4">Название </p>
              {isEditingShopName ? (
                <>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                  <button type="submit">Изменить</button>
                </>
              ) : (
                <>
                  <p className="">{CurrentCoffeeShop?.shopName}</p>
                  <p onClick={() => setIsEditingShopName(true)}>
                    <FaPencil className="mx-8" />
                  </p>
                </>
              )}
            </div>
            <div className="flex my-2">
              <p className=" font-bold mx-4">Город </p>
              {isEditingCity ? (
                <>
                  <input
                    type="text"
                    style={{ border: 'solid' }}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <button type="submit">Изменить</button>
                </>
              ) : (
                <>
                  <p className="">{CurrentCoffeeShop?.city}</p>
                  <p onClick={() => setIsEditingCity(true)}>
                    <FaPencil className="mx-8" />
                  </p>
                </>
              )}
            </div>
            <div className="flex my-2">
              <p className=" font-bold mx-4">Адрес</p>
              {isEditingAddress ? (
                <>
                  <input
                    type="text"
                    style={{ border: 'solid' }}
                    value={address}
                    onChange={(e) => setAdress(e.target.value)}
                  />
                  <button type="submit">Изменить</button>
                </>
              ) : (
                <>
                  <p className="">{CurrentCoffeeShop?.address}</p>
                  <p onClick={() => setIsEditingAddress(true)}>
                    <FaPencil className="mx-8" />
                  </p>
                </>
              )}
            </div>
            <div className="flex flex-column gap-2 my-2 w-min rounded-2xl shadow-2xl">
              <p className=" font-bold mx-4">Карта</p>
              <MapComponent address={`${CurrentCoffeeShop?.city}, ${CurrentCoffeeShop?.address}`} />
            </div>
            <div className="flex my-2">
              <p className=" font-bold mx-4">Описание </p>
              {isEditingDescription ? (
                <>
                  <input
                    type="text"
                    style={{ border: 'solid' }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <button type="submit">Изменить</button>
                </>
              ) : (
                <>
                  <p className="">{CurrentCoffeeShop?.description}</p>
                  <p onClick={() => setIsEditingDescription(true)}>
                    <FaPencil className="mx-8" />
                  </p>
                </>
              )}
            </div>
            <div className="flex my-2">
              <p className=" font-bold mx-4">Меню </p>
              {isEditingMenu ? (
                <>
                  <input
                    type="text"
                    style={{ border: 'solid' }}
                    value={menu}
                    onChange={(e) => setMenu(e.target.value)}
                  />
                  <button type="submit">Изменить</button>
                </>
              ) : (
                <>
                  <p className="">{CurrentCoffeeShop?.menu}</p>
                  <p onClick={() => setIsEditingMenu(true)}>
                    <FaPencil className="mx-8" />
                  </p>
                </>
              )}
            </div>
            {/* <div className="flex my-2 flex-col">
              <p className=" font-bold mx-4">Фото </p>
              <img src={CurrentCoffeeShop?.photo} className="" alt="" />
            </div> */}
            <div>
              {/* <input type="file" onChange={handleFileChange} /> */}
              {/* {uploading && <div>Uploading photo...</div>}
              {error && <div>Error: {error}</div>} */}

              <div className="relative mb-6">
                <img
                  src={CurrentCoffeeShop?.photo}
                  className="profileEditImg ml-4"
                  alt=""
                  srcSet=""
                />
                <FaPencil
                  className="ml-4 w-10 hover:text-green-400"
                  onClick={() => setShowPhotoForm((prev) => !prev)}
                />
                <p className="text-left ml-4">Изменить фото</p>
              </div>
              {showPhotoForm && (
                <>
                  <input type="file" accept="image/*" onChange={handleFileChange} />
                  <button
                    onClick={handlePhotoUpload}
                    type="button"
                    className="py-1 px-4 bg-green-300 my-4 hover:bg-green-400"
                  >
                    Загрузить фото
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </form>

      <div className="flex flex-col Favorites w-3/6">
        <CoffeeShopFavorites />
      </div>
    </div>
  );
}

export default CoffeeShopProfile;
