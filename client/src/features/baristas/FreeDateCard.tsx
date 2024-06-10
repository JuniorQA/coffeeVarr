/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { type FreeDate } from '../calendar/FreeDate';
import type { RootState } from '../../store';
import { useAppDispatch } from '../../store';
import { removeFreeDateBarista } from './BaristasSlice';

type DatePropsType = {
  date: FreeDate;
};
function FreeDateCard({ date}: DatePropsType): JSX.Element {
  const freeDates = useSelector((state: RootState) => state.barista.freeDates);
  useEffect(() => {
  }, [freeDates]);
  const dispatch = useAppDispatch();
  function handleDeleteDate(id: number): void {
    dispatch(removeFreeDateBarista(id));
  }

  const newDate = new Date(String(date.Date));
  useEffect(() => {}, []);
  return (
    <div className="container mb-2 shadow-2xl rounded-2xl" key={date.id}>
      <div className="container flex flex-wrap">
        <strong className="text-center my-auto">{newDate.toLocaleDateString()}</strong>
        <button type="button" onClick={() => handleDeleteDate(date.id)}>
          Отменить
        </button>
      </div>
    </div>
  );
}

export default FreeDateCard;
