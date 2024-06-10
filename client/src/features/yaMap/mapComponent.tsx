import React from 'react';

import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import useGeoCodder from './useGeoCodder';

type MapComponentProps = {
  address: string;
};

export default function MapComponent({ address }: MapComponentProps): JSX.Element {

  const coordinates = useGeoCodder({ address });

  return (
    <div>
      <div className="container">
        {coordinates.length ? (
          <YMaps>
            <Map
              defaultState={{
                center: coordinates,
                zoom: 13,
              }}
            >
              <Placemark geometry={coordinates} />
            </Map>
          </YMaps>
        ) : (
          <strong>Не загрузились координаты:=(</strong>
        )}
      </div>
    </div>
  );
}
