/* eslint-disable import/prefer-default-export */
import type User from '../auth/User';
import type { Barista } from '../baristas/Baristas';
import type Rating from './Rating';

export const fetchsaveRating = async (
  NewRating: Rating['value'],
  baristaId: Barista['id'],
  userId: User['id'],
): Promise<Rating> => {
  const response = await fetch('/api/rating', {
    method: 'POST',
    body: JSON.stringify({ NewRating, baristaId, userId }),
    headers: {
      'Content-type': 'application/json',
    },
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  }
};
