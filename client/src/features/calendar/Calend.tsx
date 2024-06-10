import React from 'react';
import 'react-calendar/dist/Calendar.css';
import MapComponent from '../yaMap/mapComponent';
// import CalendComponent from './CalendComponent';
// import initMap from '../yaMap/mapComponent';

export default function Calend(): JSX.Element {
  return (
    <div className="container flex">
      {/* <CalendComponent /> */}

      <div className="className">
        <h2>Календарь</h2>
        <div id="map-test" className="map container flex justify-center mt-10 rounded-2xl">
          <MapComponent address="Санкт-Петербург, Тореза проспект, 88" />
        </div>
      </div>
    </div>
  );
}
