import React, { useState } from 'react';
import { CiCoffeeCup } from 'react-icons/ci';
import { BsPersonRaisedHand } from 'react-icons/bs';
import { IoInformationOutline } from 'react-icons/io5';
import { TiHomeOutline, TiNews } from 'react-icons/ti';
import './Style.css';
import { Link } from 'react-router-dom';

function SideMenu(): JSX.Element {
  const [activeItem, setActiveItem] = useState<string>('');
  const handleMouseEnter = (item: string): void => {
    setActiveItem(item);
  };

  const handleMouseLeave = (): void => {
    setActiveItem('');
  };

  return (
    <div className="all">
      <div className="icon">
        <div
          className="text"
          onMouseEnter={() => handleMouseEnter('home')}
          onMouseLeave={handleMouseLeave}
        >
          <TiHomeOutline size={32} className="text-black" />
          <div className="textleft text-black">
            {activeItem === 'home' && <Link to="/">Главная</Link>}
          </div>
        </div>
        <div
          className="text"
          onMouseEnter={() => handleMouseEnter('baristas')}
          onMouseLeave={handleMouseLeave}
        >
          <BsPersonRaisedHand size={32} className="text-black" />
          <div className="textleft text-black">
            {activeItem === 'baristas' && <Link to="/baristas">Баристы</Link>}
          </div>
        </div>
        <div
          className="text"
          onMouseEnter={() => handleMouseEnter('cafes')}
          onMouseLeave={handleMouseLeave}
        >
          <CiCoffeeCup size={32} className="text-black" />
          <div className="textleft text-black">
            {activeItem === 'cafes' && <Link to="/coffeshop">Кофейни</Link>}
          </div>
        </div>
        <div
          className="text"
          onMouseEnter={() => handleMouseEnter('contacts')}
          onMouseLeave={handleMouseLeave}
        >
          <IoInformationOutline size={32} className="text-black" />
          <div className="textleft text-black">
            {activeItem === 'contacts' && <Link to="/about">О нас</Link>}
          </div>
        </div>
        <div
          className="text"
          onMouseEnter={() => handleMouseEnter('news')}
          onMouseLeave={handleMouseLeave}
        >
          <TiNews size={32} className="text-black" />
          <div className="textleft text-black">
            {activeItem === 'news' && <Link to="/news">Новости</Link>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
