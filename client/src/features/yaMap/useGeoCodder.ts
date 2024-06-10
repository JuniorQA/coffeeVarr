import { useEffect, useState } from 'react';

import axios from 'axios';

type GeoCodderProps = {
  address: string;
};

export default function useGeoCodder({ address }: GeoCodderProps): number[] {
  const [coordinates, setCoordinates] = useState<number[]>([]);
  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        // Запрос к API Yandex Maps Geocoding
        const response = await axios.get(
          `https://geocode-maps.yandex.ru/1.x/?apikey=151e3c4e-5b24-4ff4-b3dd-ee46a27a6498&geocode=${encodeURIComponent(
            address,
          )}&format=json`,
        );

        // Обработка ответа
        const featureMember = response.data?.response?.GeoObjectCollection?.featureMember;
        const firstGeoObject =
          featureMember && featureMember.length > 0 ? featureMember[0].GeoObject : null;

        // Получение координат
        const coords = firstGeoObject?.Point?.pos.split(' ').map(Number) || [];

        setCoordinates(coords);
      } catch (error) {
        console.error('Error during geocoding:', error);
      }
    };

    fetchCoordinates();
  }, [address]);
  return coordinates.reverse();
}
