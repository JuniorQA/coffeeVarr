type CoffeeShop = {
  id: number;
  address: string;
  city: string;
  description: string;
  menu: string;
  photo?: string;
  shopName: string;
  userId?: number;
};

export type CoffeeUpdate = Omit<CoffeeShop, 'userId' | 'photo'>;
// export  type CoofeUpdate={
//   address: string;
//   city: string;
//   description: string;
//   menu: string;
//   shopName: string;
// }
export default CoffeeShop;
