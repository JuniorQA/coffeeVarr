import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { type RootState, useAppDispatch } from '../store';
import { logUser } from '../features/auth/authSlice';

function LoginPage({ onRequestClose }: { onRequestClose: () => void }): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector((store: RootState) => store.auth.error);

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const dispatchResult = await dispatch(logUser({ email, password }));
    if (logUser.fulfilled.match(dispatchResult)) {
      onRequestClose();
    }
  };
  return (
    <div className="w-full max-w-xs mx-auto mt-5">
      <form
        className="lofasd bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="lpv block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Войти
          </button>
          {error && <div>{error}</div>}
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
