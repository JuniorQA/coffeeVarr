import React from 'react';
// , { useEffect, useState }
// import { useSelector } from 'react-redux';
// import { RootState, useAppDispatch } from '../../store';
// import { loadFreeDatesBarista } from './BaristasSlice';
// import CalendComponent from '../calendar/CalendComponent';
import type { FreeDate } from './FreeDate';
import BaristaFreeDateCard from './BaristaFreeDateCard';

function BaristaPageFreeDates({
  freeDates,
  baristaUserId,
}: {
  freeDates: FreeDate[];
  baristaUserId: number;
}): JSX.Element {
  // const dispatch = useAppDispatch();
  // const freeDates = useSelector((state: RootState) => state.barista.freeDates);
  // useEffect(() => {
  //   dispatch(loadFreeDatesBarista());

  // }, [dispatch]);
  console.log(baristaUserId, 'THIS IS userId in BaristaPageFreeDates');
  return (
    <div className="max-w-screen-sm mx-auto mt-2 my-20 mt-2 flex flex-wrap">
      <h4>Даты в которых я смогу выйти на смену:</h4>
      {freeDates.length > 0 ? (
        freeDates.map((freeDate) => (
          <div className="container max-w-xs" key={freeDate.id}>
            <BaristaFreeDateCard date={freeDate} baristaUserId={baristaUserId} />
          </div>
        ))
      ) : (
        <p>Нет свободных дат</p>
      )}
    </div>
  );
}

export default BaristaPageFreeDates;
