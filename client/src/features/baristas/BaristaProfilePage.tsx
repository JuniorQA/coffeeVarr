import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaPencil } from 'react-icons/fa6';
import { useAppDispatch, type RootState } from '../../store';
// import { fetchLoadBaristaProfile } from './api';
// import { useParams } from 'react-router';
import {
  LoadBaristaProfile,
  loadFreeDatesBarista,
  updateBarista,
  updatePhotoBarista,
} from './BaristasSlice';
import CalendComponent from '../calendar/CalendComponent';
import BaristaFreeDates from './BaristaFreeDates';
import type { NewBarista } from './Baristas';
import ProfileMessageComponent from './ProfileMessageComponent';

function BaristaProfilePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const CurrentBarista = useSelector((state: RootState) => state.barista.CurrentBarista);
  const freeDates = useSelector((state: RootState) => state.barista.freeDates);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAge, setIsEditingAge] = useState(false);
  const [isEditingGender, setIsEditingGender] = useState(false);
  const [isEditingExperience, setIsEditingExperience] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingSkills, setIsEditingSkills] = useState(false);

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<string>('');
  const [experience, setExperience] = useState<number>(0);
  const [skills, setSkills] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  useEffect(() => {
    if (user) {
      dispatch(LoadBaristaProfile(user.id));
    }
  }, [user]);
  useEffect(() => {
    dispatch(loadFreeDatesBarista());
  }, [dispatch]);
  useEffect(() => {
    if (CurrentBarista) {
      setAge(CurrentBarista.age);
      setDescription(CurrentBarista.description);
      setExperience(Number(CurrentBarista.experience));
      setGender(CurrentBarista.gender);
      setSkills(CurrentBarista.skills);
      setFirstName(CurrentBarista.baristaFirstName);
      setLastName(CurrentBarista.baristaLastName);
    }
  }, [CurrentBarista]);
  const [showPhotoForm, setShowPhotoForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const obj: NewBarista = {
      baristaFirstName: firstName,
      baristaLastName: lastName,
      description,
      age,
      gender,
      experience,
      skills,
      id: CurrentBarista!.id,
    };

    const dispatchResult = await dispatch(updateBarista(obj));
    console.log(dispatchResult);

    if (updateBarista.fulfilled.match(dispatchResult)) {
      setIsEditingDescription(false);
      setIsEditingAge(false);
      setIsEditingExperience(false);
      setIsEditingGender(false);
      setIsEditingSkills(false);
      setIsEditingName(false);
    }
  };
  const handlePhotoUpload = async (): Promise<void> => {
    if (selectedFile) {
      try {
        dispatch(updatePhotoBarista(selectedFile));
        setShowPhotoForm(false);
      } catch (error) {
        console.error(error);
      }
    }
  };
  // const handlePhotoUpload = async (): Promise<void> => {
  //   if (selectedFile) {
  //     try {
  //       dispatch(updatePhotoBarista(selectedFile));
  //       setShowPhotoForm(false);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };
  return (
    <form onSubmit={handleSubmit}>
      <div className="ProfilePage text-xl border-2 px-5 py-5 rounded-lg">
        <div className="ProfileDesc flex flex-col w-3/6 justify-start text-start">
          <div className="flex my-2 flex-col">
            <img className="rounded-2xl shadow-2xl" src={`${CurrentBarista?.photo}`} alt="" />
          </div>
          <div className="flex my-4">
            <p className=" font-bold mx-4">Имя </p>
            {isEditingName ? (
              <>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <button type="submit">Изменить</button>
              </>
            ) : (
              <>
                <p className="">{CurrentBarista?.baristaFirstName}</p>
                <p className="">{CurrentBarista?.baristaLastName}</p>

                <p onClick={() => setIsEditingName(true)}>
                  <FaPencil className="mx-8" />
                </p>
              </>
            )}
          </div>
          <div className="flex my-2">
            <p className=" font-bold mx-4">Возраст </p>
            {isEditingAge ? (
              <>
                <input type="text" value={age} onChange={(e) => setAge(+e.target.value)} />
                <button type="submit">Изменить</button>
              </>
            ) : (
              <>
                <p className="">{CurrentBarista?.age} лет</p>

                <p onClick={() => setIsEditingAge(true)}>
                  <FaPencil className="mx-8" />
                </p>
              </>
            )}
          </div>
          <div className="flex my-2">
            <p className=" font-bold mx-4">Пол </p>
            {isEditingGender ? (
              <>
                <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
                <button type="submit">Изменить</button>
              </>
            ) : (
              <>
                <p className="">{CurrentBarista?.gender}</p>

                <p onClick={() => setIsEditingGender(true)}>
                  <FaPencil className="mx-8" />
                </p>
              </>
            )}
          </div>

          <div className="flex my-2 flex-col">
            {CurrentBarista ? <CalendComponent freeDates={freeDates} /> : ''}
          </div>
          <div className="flex my-2 flex-col">
            {freeDates.length > 0 ? <BaristaFreeDates freeDates={freeDates} /> : ''}
          </div>
          <div className="flex my-2 flex-col">
            <ProfileMessageComponent />
          </div>
          <div className="flex my-2">
            <p className=" font-bold mx-4">Опыт </p>
            {isEditingExperience ? (
              <>
                <input
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(+e.target.value)}
                />
                <button type="submit">Изменить</button>
              </>
            ) : (
              <>
                <p className="">{CurrentBarista?.experience} лет</p>

                <p onClick={() => setIsEditingExperience(true)}>
                  <FaPencil className="mx-8" />
                </p>
              </>
            )}
          </div>
          <div className="flex my-2 flex-col">
            <p className=" font-bold mx-4">Навыки </p>
            {isEditingSkills ? (
              <>
                <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} />
                <button type="submit">Изменить</button>
              </>
            ) : (
              <>
                <p className="">{CurrentBarista?.skills}</p>
                <p onClick={() => setIsEditingSkills(true)}>
                  <FaPencil className="mx-8" />
                </p>
              </>
            )}
          </div>
          <div className="flex my-2 flex-col">
            <p className=" font-bold mx-4">Описание </p>
            {isEditingDescription ? (
              <>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Изменить</button>
              </>
            ) : (
              <>
                <p className="">{CurrentBarista?.description}</p>
                <p onClick={() => setIsEditingDescription(true)}>
                  <FaPencil className="mx-8" />
                </p>
              </>
            )}
          </div>
          <div className="flex my-2">
            <p className=" font-bold mx-4">Рейтинг </p>
            <p className="">{CurrentBarista?.rating}</p>
          </div>
        </div>
        <div className="Favorites" />
        <div>
          <div className="relative mb-6">
            <img src={CurrentBarista?.photo} className="profileEditImg" alt="" srcSet="" />
            <FaPencil
              className="m-8 w-10 absolute bottom-0 left-0 hover:text-green-400"
              onClick={() => setShowPhotoForm((prev) => !prev)}
            />
            <p className="m-8 text-left">Изменить фото</p>
          </div>
          {showPhotoForm && (
            <>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <button
                onClick={handlePhotoUpload}
                type="button"
                className="py-1 px-4 bg-green-300 my-4 hover:bg-green-400"
              >
                Загрузить фото
              </button>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

export default BaristaProfilePage;
