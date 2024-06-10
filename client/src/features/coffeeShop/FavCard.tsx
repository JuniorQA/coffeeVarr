import React from 'react';
import type { Barista } from '../baristas/Baristas';
import { Link } from 'react-router-dom';

type BaristaPropsType = {
  barista: Barista;
};
function FavCard({ barista }: BaristaPropsType): JSX.Element {
  return (
    <div
      className="container flex items-center flex-column gap-3 shadow-2xl rounded-2xl"
      key={barista.id}
    >
      <Link to={`/baristas/${barista.id}`}>
        <img className="rounded-2xl" style={{ maxHeight: '150px' }} src={barista.photo} alt="" />
      </Link>
      <p>
        <strong>{barista.baristaFirstName}</strong>
      </p>
    </div>
  );
}

export default FavCard;
