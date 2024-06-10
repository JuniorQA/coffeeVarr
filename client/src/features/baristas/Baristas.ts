import type { FreeDate } from '../calendar/FreeDate';

export type NewBarista = {
  id: number;
  baristaFirstName: string;
  baristaLastName: string;
  age: number;
  gender: string;
  description: string;
  experience: number;
  skills: string;
  userId?: number;
};

export type Barista = {
  id: number;
  role: string;
  email: string;
  userId: number;
  baristaFirstName: string;
  baristaLastName: string;
  photo: string;
  description: string;
  age: number;
  gender: string;
  experience: string;
  skills: string;
  rating: number;
  FreeDateBaristas: FreeDate[];
};
