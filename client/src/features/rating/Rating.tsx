import React, { useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import { useSelector } from 'react-redux';
import { useAppDispatch, type RootState } from '../../store';

function Rating(): JSX.Element {
  const [rating, setRating] = useState(0);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const ratingChanged = (newRating: number) => {
    setRating(newRating);
    dispatch(saveRating);
  };
  return <ReactStars count={5} onChange={ratingChanged} size={40} activeColor={'#ffd700'} />;
}

export default Rating;
