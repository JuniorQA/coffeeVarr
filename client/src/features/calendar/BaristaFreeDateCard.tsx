/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { type FreeDate } from './FreeDate';
import type { RootState } from '../../store';
import MessageComponent from '../messages/MessageComponent';

type DatePropsType = {
  date: FreeDate;
  baristaUserId: number;
};
function BaristaFreeDateCard({ date, baristaUserId }: DatePropsType): JSX.Element {
  console.log(baristaUserId, 'THIS IS baristaUserId in BaristaFreeDateCard');
  const freeDates = useSelector((state: RootState) => state.barista.freeDates);
  const [messageComponent, setMessageComponent] = useState(false);
  useEffect(() => {}, [freeDates]);
  // const dispatch = useAppDispatch();
  function handleDeleteDate(id: number): void {
    setMessageComponent((prev) => !prev);
  }

  const newDate = new Date(String(date.Date));
  useEffect(() => {}, []);
  return (
    <div className="flex items-center gap-3 shadow-2xl rounded-2xl" key={date.id}>
      {messageComponent ? <MessageComponent id={baristaUserId} /> : ''}
      <div className="flex flex-column">
        <strong className="text-center my-auto">{newDate.toLocaleDateString()}</strong>
        <button type="button" onClick={() => handleDeleteDate(baristaUserId)}>
          <strong>{messageComponent ? 'Отмена' : 'Отправить запрос'}</strong>
        </button>
      </div>
    </div>
  );
}
export default BaristaFreeDateCard;
