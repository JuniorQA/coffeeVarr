/* eslint-disable import/prefer-default-export */

import type { Barista } from '../baristas/Baristas';
import type CoffeeShop from './CoffeeShop';
import type { CoffeeUpdate } from './CoffeeShop';

export const fetchUpdatePhoto = async (file: File) => {
  const formData = new FormData();
  formData.append('photo', file);
  // Отправка запроса на сервер для обновления фотографии пользователя
  const response = await fetch('/api/coffeeShop/upload-photo', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const updatedCoffeShop = await response.json();
    return updatedCoffeShop;
  }
  throw new Error('Ошибка при обновлении фотографии пользователя');
};

export const fetchLoadCoffeeShop = async (): Promise<CoffeeShop[]> => {
  const responce = await fetch('/api/coffeeShop');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = await responce.json();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  return data.user;
};

export const fetchUpdateCoffeeShop = async (coffeupdate: CoffeeUpdate): Promise<CoffeeUpdate> => {

  const responce = await fetch(`/api/coffeeShop/${coffeupdate.id}`, {
    method: 'PUT',
    body: JSON.stringify(coffeupdate),
    headers: {
      'Content-type': 'application/json',
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data: CoffeeUpdate = await responce.json();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  return data[1][0];
};

export const fetchLoadCoffeeShopProfile = async (): Promise<CoffeeShop> => {
  const responce = await fetch('/api/coffeeShop/getCoffeeShopUser');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = await responce.json();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  return data;
};

export const fetchloadFavoriteBarista = async (): Promise<Barista[]> => {
  const response = await fetch('/api/favorites');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = await response.json();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  return data;
};

export const saveToFavorites = async (id: Barista['id']): Promise<Barista> => {
  const response = await fetch('/api/favorites', {
    method: 'POST',
    body: JSON.stringify({ baristaId: id }),
    headers: {
      'Content-type': 'application/json',
    },
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  }

  throw new Error(data.message);
};
export const removeFromFavorites = async (id: Barista['id']): Promise<number> => {
  const response = await fetch(`/api/favorites/${id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    return id;
  }
  const data: { message: string } = await response.json();
  throw new Error(data.message);
};
