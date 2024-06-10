/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';

function UserRegisterPage({
  role,
  onRequestClose,
}: {
  role: string;
  onRequestClose: () => void;
}): JSX.Element {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const resUser = await fetch('api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        role,
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const dataUser = await resUser.json();
    const userId: number = dataUser.user.id;
    if (dataUser) {
      await fetch('/api/auth/register/individualUser', {
        method: 'POST',
        body: JSON.stringify({
          lastName,
          firstName,
          userId,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    onRequestClose();
  };
  return (
    <div className="w-full max-w-xs mx-auto mt-5">
      <form
        className="lofasd bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
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
            onChange={(e) => setEmail(e.target.value)}
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
            value={firstName}
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
            value={lastName}
            required
            onChange={(e) => setLastName(e.target.value)}
          />
          {/* <p className="text-red-500 text-xs italic">Введите пароль</p> */}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Регистрация
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserRegisterPage;
