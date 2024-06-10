/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Modal from 'react-modal';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CoffeeShopRegisterpage from './CoffeeShopRegisterpage';
import UserRegisterPage from './UserRegisterPage';
import BaristaRegisterPage from './BaristaRegisterPage';
import LoginPage from './LoginPage';
import type { RootState } from '../store';
import { useAppDispatch } from '../store';
import { logoutUser } from '../features/auth/authSlice';

export default function Header(): JSX.Element {
  const CurrentCoffeeShop = useSelector((state: RootState) => state.coffeeShop.CurrentCoffeeShop);
  const CurrentBarista = useSelector((state: RootState) => state.barista.CurrentBarista);
  const [modalIsOpenReg, setIsOpenReg] = useState(false);
  const [modalIsOpenLog, setIsOpenLog] = useState(false);
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useSelector((store: RootState) => store.auth.user);
  console.log(user?.photoUser);
  

  const customStyles: Modal.Styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(30 27 27 / 77%)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#242424',
    },
  };
  const customStylesBarista: Modal.Styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(30 27 27 / 77%)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#242424',
      width: '1000px',
      alignItems: 'center',
    },
  };
  Modal.setAppElement('body');

  const handleLogout = async (): Promise<void> => {
    dispatch(logoutUser());
    navigate('/');
  };

  const handleOpenModalReg = (): void => {
    setIsOpenReg(true);
  };

  const handleCloseModalReg = (): void => {
    setIsOpenReg(false);
  };
  const handleOpenModalLog = (): void => {
    setIsOpenLog(true);
  };

  const handleCloseModalLog = (): void => {
    setIsOpenLog(false);
  };

  return (
    <div
      style={{ backgroundColor: ' #f2f2f2' }}
      className="header flex bg-blue-200 w-full h-24 rounded-2xl"
    >
      <div className="container justify-self-start flex">
        {window.location.pathname !== '/' && (
          <div onClick={() => navigate(-1)} className="flex flex-col items-center">
            <FaArrowLeft className="FaArrowLeft" />
          </div>
        )}
        {user?.role === 'barista' && (
          <Link to="/baristaProfile">
            <div>
              <img
                // src={user.photoBarista || user.photoCoffeeShop || user.photoUser}
                src={CurrentBarista?.photo}
                alt=""
                className="profile_photo"
              />
              <p>Профиль</p>
            </div>
          </Link>
        )}
        {user?.role === 'coffeeShop' && (
          <Link to="/coffeeShopProfile">
            <div>
              <img
                // src={user.photoBarista || user.photoCoffeeShop || user.photoUser}
                src={CurrentCoffeeShop?.photo}
                alt=""
                className="profile_photo"
              />
              <p>Профиль</p>
            </div>
          </Link>
        )}
      </div>
      <div className="justify-self-end items-center flex justify-around mr-10">
        <div className="flex gap-2">
          {user ? (
            <button
              type="button"
              className="outline-solid p-2 max-h-12 hover:bg-violet-600 hover:text-white"
              onClick={handleLogout}
            >
              Выход
            </button>
          ) : (
            <>
              <button
                type="button"
                className="outline-solid p-2 hover:bg-violet-600 hover:text-white"
                onClick={handleOpenModalLog}
              >
                Вход
              </button>
              <button
                type="button"
                className="outline-solid max-h-12 p-2 hover:bg-violet-600 hover:text-white"
                onClick={handleOpenModalReg}
              >
                Регистрация
              </button>
            </>
          )}
        </div>
        <Modal
          isOpen={modalIsOpenReg}
          onRequestClose={handleCloseModalReg}
          style={customStylesBarista}
        >
          <div className="w-full max-w-xs mt-5 flex flex-col items-center justify-center">
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                Профиль
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="role"
                placeholder="Ваша роль"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option selected={false} value="defaultvalue">
                  Выберите профиль
                </option>
                <option value="barista">Бариста</option>
                <option value="coffeeShop">Кофейня</option>
              </select>
            </div>
            {role === 'coffeeShop' ? (
              <CoffeeShopRegisterpage role={role} onRequestClose={handleCloseModalReg} />
            ) : role === 'individualUser' ? (
              <UserRegisterPage role={role} onRequestClose={handleCloseModalReg} />
            ) : role === 'barista' ? (
              <BaristaRegisterPage role={role} onRequestClose={handleCloseModalReg} />
            ) : (
              <div>Выберите профиль</div>
            )}
          </div>
        </Modal>
        <Modal isOpen={modalIsOpenLog} onRequestClose={handleCloseModalLog} style={customStyles}>
          <LoginPage onRequestClose={handleCloseModalLog} />
        </Modal>
      </div>
    </div>
  );
}
