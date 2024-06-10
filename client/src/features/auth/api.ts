/* eslint-disable @typescript-eslint/no-unsafe-return */
// import type User from './User';
import { NewBarista } from '../baristas/Baristas';
import type { UserLocale } from './User';
import User from './User';

// eslint-disable-next-line import/prefer-default-export
export const fetchRegisterBarista = async (barista: NewBarista): Promise<void> => {
  const res = await fetch('/api/auth/register/barista', {
    method: 'POST',
    body: JSON.stringify(barista),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
};
export const fetchRegisterUser = async (newUser: {
  role: string;
  email: string;
  password: string;
}): Promise<User> => {
  const responce = await fetch('api/auth/register', {
    method: 'POST',
    body: JSON.stringify(newUser),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const dataUser = await responce.json();
  if (responce.ok) {
    return dataUser.user;
  }
  throw new Error(dataUser.message);
};

export const fetchLogUser = async (newUser: {
  email: string;
  password: string;
}): Promise<UserLocale> => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = await response.json();
  if (response.ok) {
    return data.user;
  }
  throw new Error(data.message);
};

export const fetchLogoutUser = async (): Promise<void> => {
  await fetch('/api/auth/logout');
};

export const fetchCheckUser = async (): Promise<{
  message: string;
  user: UserLocale;
}> => {
  const res = await fetch('/api/auth/check');
  return res.json();
};
