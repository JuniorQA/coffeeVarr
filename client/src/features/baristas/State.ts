import type { Barista } from './Baristas';
import type { FreeDate } from '../calendar/FreeDate';

type BaristaState = {
  BaristasList: Barista[];
  CurrentBarista: Barista | null;
  freeDates: FreeDate[];
};

export default BaristaState;
