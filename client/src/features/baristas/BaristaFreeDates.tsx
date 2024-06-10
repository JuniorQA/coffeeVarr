import React from 'react';
// , { useEffect, useState }
// import { useSelector } from 'react-redux';
// import { RootState, useAppDispatch } from '../../store';
// import { loadFreeDatesBarista } from './BaristasSlice';
import FreeDateCard from './FreeDateCard';
// import CalendComponent from '../calendar/CalendComponent';
import type { FreeDate } from '../calendar/FreeDate';

function BaristaFreeDates({
  freeDates,
}: {
  freeDates: FreeDate[];
}): JSX.Element {
  // const dispatch = useAppDispatch();
  // const freeDates = useSelector((state: RootState) => state.barista.freeDates);
  // useEffect(() => {
  //   dispatch(loadFreeDatesBarista());

  // }, [dispatch]);

  return (
    <div className="w-96 mx-auto mt-2 my-20 mt-2 flex flex-wrap">
      <h4>Даты отмеченные как свободные:</h4>
      {freeDates.length > 0 ? (
        freeDates.map((freeDate) => (
          <div className="container max-w-xs" key={freeDate.id}>
            <FreeDateCard date={freeDate} />
          </div>
        ))
      ) : (
        <p>Нет свободных дат</p>
      )}
    </div>
  );
}

export default BaristaFreeDates;
