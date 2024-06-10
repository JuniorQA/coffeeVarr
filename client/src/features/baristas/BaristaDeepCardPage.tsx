import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import type { Barista } from './Baristas';
import { useAppDispatch, type RootState } from '../../store';
// import { fetchLoadBaristaProfile } from './api';
// import { useParams } from 'react-router';
import { LoadBaristaProfile, loadFreeDatesBarista } from './BaristasSlice';
import BaristaCalendComponent from '../calendar/BaristaCalendComponent';
import BaristaPageFreeDates from '../calendar/BaristaPageFreeDates';

function BaristaDeepCardPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const BaristaList = useSelector((state: RootState) => state.barista.BaristasList);
  const { baristaId } = useParams();
  let barista: Barista | undefined;

  if (baristaId) {
    barista = BaristaList.find((v) => v.id === +baristaId);
  }
  useEffect(() => {
    if (user) {
      dispatch(LoadBaristaProfile(user.id));
    }
  }, [user]);
  useEffect(() => {
    dispatch(loadFreeDatesBarista());
  }, [dispatch]);

  return (
    <div className="ProfilePage text-xl border-2 px-5 py-5 rounded-lg">
      {barista ? (
        <div className="ProfileDesc flex flex-col w-3/6 justify-start text-start">
          <div className="flex my-2 flex-col">
            <img className="rounded-2xl shadow-2xl" src={`${barista.photo}`} alt="" />
          </div>
          <div className="flex my-4">
            <p className=" font-bold mx-4">Имя </p>
            <p className="">
              {barista.baristaFirstName} {barista?.baristaLastName}
            </p>
          </div>
          <div className="flex my-2">
            <p className=" font-bold mx-4">Возраст </p>
            <p className="">{barista.age} лет</p>
          </div>
          <div className="flex my-2">
            <p className=" font-bold mx-4">Пол </p>
            <p className="">{barista.gender}</p>
          </div>

          <div className="flex my-2 flex-col">
            <BaristaCalendComponent freeDates={barista.FreeDateBaristas} />
          </div>
          <div className="flex my-2 flex-col">
            {barista.FreeDateBaristas.length > 0 && user && user.role !== 'barista' ? (
              <BaristaPageFreeDates
                freeDates={barista.FreeDateBaristas}
                baristaUserId={barista.userId}
              />
            ) : (
              ''
            )}
          </div>
          <div className="flex my-2">
            <p className=" font-bold mx-4">Опыт </p>
            <p className="">{barista.experience} лет</p>
          </div>
          <div className="flex my-2 flex-col">
            <p className=" font-bold mx-4">Навыки </p>
            <p className="">{barista.skills}</p>
          </div>
          <div className="flex my-2 flex-col">
            <p className=" font-bold mx-4">Описание </p>
            <p className="">{barista.description}</p>
          </div>
          <div className="flex my-2">
            <p className=" font-bold mx-4">Рейтинг </p>
            <p className="">{barista.rating}</p>
          </div>
        </div>
      ) : (
        'Скорее всего данный бариста не существует, или Вы перезагрузили страницу =('
      )}
    </div>
  );
}

export default BaristaDeepCardPage;
