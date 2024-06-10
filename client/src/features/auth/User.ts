export type Barista = {
  id: number;
  role: string;
  email: string;
  baristaId: number;
  baristaFirstName: string;
  baristaLastname: string;
  photoBarista: string;
  // age: number;
  // gender: string;
  // exprerience: number;
  // skills: string;
  // description: string;
};
export type Individualuser = {
  id: number;
  role: string;
  email: string;
  individualUserId: number;
  firstName: string;
  secondName: string;
  photoUser: string;
};
export type CoffeeShop = {
  id: number;
  role: string;
  email: string;
  shopId: string;
  shopName: string;
  photoCoffeeShop: string;
  menu: string;
  adress: string;
  photo: string;
  city: string;
  description: string;
};

type User = {
  id: number;
  email: string;
  role: string;
  Barista?: Barista;
  Individualuser?: Individualuser;
  // CoffeeShop?: CoffeeShop;
};
export type UserLocale = {
  id: number;
  email: string;
  role: string;
  shopId?: number;
  individualUserId?: number;
  baristaId?: number;
  shopName?: string;
  firstName?: string;
  secondName?: string;
  baristaFirstName?: string;
  baristaSecondName?: string;
  photoUser?: string;
  photoBarista?: string;
  photoCoffeeShop?: string;
};
export type UserWithoutId = Omit<User, 'id'>;
export default User;
