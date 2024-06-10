import React, { useState } from 'react';
import * as api from '../features/auth/api';
function BaristaRegisterPage({
  role,
  onRequestClose,
}: {
  role: string;
  onRequestClose: () => void;
}): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [baristaFirstName, setFirstName] = useState('');
  const [baristaLastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [experience, setExperience] = useState('');
  const [age, setAge] = useState(0);
  const [regError, setRegError] = useState<string | null>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    setRegError(null);
    try {
      const user = await api.fetchRegisterUser({ role, email, password });

      const userId: number = user.id;
      if (user) {
        await api.fetchRegisterBarista({
          baristaFirstName,
          baristaLastName,
          age,
          gender,
          experience,
          userId,
        });
      }
      onRequestClose();
    } catch (error: any) {
      setRegError(error.message);
    }
  };

  const handleChangeEmail: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setRegError(null);
    setEmail(e.target.value);
  };
  return (
    <div className="w-max mt-5 ">
      {regError && <div style={{ backgroundColor: 'red' }}>{regError}</div>}
      <form
        className="lofasd bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex "
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col px-8">
          <div className="mb-4">
            <label className="lpv block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              E-mail
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="E-mail"
              value={email}
              required
              onChange={handleChangeEmail}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Пароль
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <p className="text-red-500 text-xs italic">Введите пароль</p> */}
          </div>
          <div className="mb-4">
            <label className="lpv block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Имя
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstName"
              type="text"
              placeholder="Имя"
              value={baristaFirstName}
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Фамилия
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="text"
              placeholder="Фамилия"
              value={baristaLastName}
              required
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
              Пол
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="gender"
              placeholder="Пол"
              value={gender}
              required
              onChange={(e) => setGender(e.target.value)}
            >
              <option selected={false} value="defaultvalue">
                Пол
              </option>
              <option value="мужской">Мужской</option>
              <option value="женский">Женский</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
              Возраст
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="age"
              type="number"
              placeholder="Возраст"
              value={age}
              required
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Опыт
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="experience"
              type="number"
              placeholder="опыт"
              value={experience}
              required
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Регистрация
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default BaristaRegisterPage;
