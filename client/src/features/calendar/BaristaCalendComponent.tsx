/* eslint-disable @typescript-eslint/no-floating-promises */
import { isSameDay } from 'date-fns';
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useAppDispatch } from '../../store';
import { loadFreeDatesBarista, saveToFreeDateBarista } from '../baristas/BaristasSlice';
import type { FreeDate } from './FreeDate';

export default function BaristaCalendComponent({
  freeDates,
}: {
  freeDates: FreeDate[];
}): JSX.Element {
  // const [value, onChange] = useState<Value>(new Date());
  const freeDateData = freeDates.map((d) => new Date(d.Date));
  // const [selectedDatesArr, setSelectedDatesArr] = useState(freedDates);

  const [selectedDates, setSelectedDates] = useState(freeDateData);
  const dispatch = useAppDispatch();
  const handleDateChange = (date: Date): void => {
    // Проверяем, был ли уже выбран этот день
    const isSelected = selectedDates.find((selectedDate) => isSameDay(selectedDate, date));

    // Если день уже выбран, убираем его из массива, иначе добавляем
    if (isSelected) {
      setSelectedDates((prevSelectedDates) =>
        prevSelectedDates.filter((selectedDate) => !isSameDay(selectedDate, date)),
      );
    } else {
      setSelectedDates((prevSelectedDates) => [...prevSelectedDates, date]);
      dispatch(saveToFreeDateBarista(date));
      dispatch(loadFreeDatesBarista());
    }
  };
  useEffect(() => {
    dispatch(loadFreeDatesBarista());
  }, [selectedDates]);

  const tileContent = ({ date, view }: { date: Date; view: string }): React.ReactNode => {
    if (
      view === 'month' &&
      selectedDates.some(
        (selectedDate: Date) => selectedDate.toDateString() === date.toDateString(),
      )
    ) {
      return (
        <div
          style={{
            backgroundColor: 'green',
            opacity: '50%',
            borderRadius: '50%',
            height: '35px',
            width: '35px',
            position: 'absolute',
            top: 3,
            right: 10,
          }}
        />
      );
    }
    return null;
  };

  return (
    <div className="container mt-10 flex">
      <div className="">
        <h2>
          <strong>Календарь свободных дат:</strong>
        </h2>
        <div className="container flex justify-center mt-10 rounded-2xl">
          <Calendar
            className="rounded-2xl shadow-2xl"
            value={selectedDates}
            onChange={handleDateChange}
            tileContent={tileContent}
          />
        </div>
        {/* <div>
          <h2>Свободные дни:</h2>
          <ul>
            {selectedDates.map((date: Date) => (
              <li key={date.toString()}>{date.toLocaleDateString()}</li>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  );
}

// type ValuePiece = Date | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];
