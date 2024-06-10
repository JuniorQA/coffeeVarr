/* eslint-disable import/prefer-default-export */
import type { FreeDate } from '../calendar/FreeDate';
import type { Barista, NewBarista } from './Baristas';

export const fetchUpdateBarista = async (baristaupdate: NewBarista): Promise<NewBarista> => {
  const responce = await fetch(`/api/barista/${baristaupdate.id}`, {
    method: 'PUT',
    body: JSON.stringify(baristaupdate),
    headers: {
      'Content-type': 'application/json',
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data: NewBarista = await responce.json();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  return data[1][0];
};

export const fetchLoadBaristas = async (): Promise<Barista[]> => {
  const responce = await fetch('/api/barista');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = await responce.json();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  return data.user;
};

export const saveToFreeDates = async (date: Date): Promise<FreeDate> => {
  const response = await fetch('/api/freeDates', {
    method: 'POST',
    body: JSON.stringify({ freeDate: date }),
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

export const loadFreeDates = async (): Promise<FreeDate[]> => {
  const response = await fetch('/api/freeDates');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = await response.json();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  return data;
};

export const removeFromDates = async (id: FreeDate['id']): Promise<number> => {
  const response = await fetch(`/api/freeDates/${id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    return id;
  }
  const data: { message: string } = await response.json();
  throw new Error(data.message);
};

export const fetchLoadBaristaProfile = async (id: number): Promise<Barista> => {
  const responce = await fetch(`/api/barista/${id}`);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = await responce.json();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  return data.user;
};

export const fetchUpdatePhotoBarista = async (file: File): Promise<Barista> => {
  const formData = new FormData();
  formData.append('photo', file);
  // Отправка запроса на сервер для обновления фотографии пользователя
  const response = await fetch('/api/barista/upload-photo', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const updatedBarista = await response.json();
    return updatedBarista;
  }
  throw new Error('Ошибка при обновлении фотографии пользователя');
};
