import type { Barista } from '../baristas/Baristas';
import type CoffeeShop from './CoffeeShop';
import type { CoffeeUpdate } from './CoffeeShop';

type CoffeeShopState = {
  CoffeeShopList: CoffeeShop[];
  CurrentCoffeeShop: CoffeeShop | null;
  favorites: Barista[];
  CoffeUpdate: CoffeeUpdate | undefined;
};

export default CoffeeShopState;
