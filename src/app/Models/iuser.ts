import { IAddress } from './iaddress';
export interface IUser {
  _id: string;
  fname: string;
  lname: string;
  phone: string;
  image: string;
  wishlist: string[];
  email: string;
  password: string;
  passwordChangedAt?: Date;
  passwordResetCode?: string;
  passwordResetExpires?: Date;
  passwordResetVerified?: string;
  active: boolean;
  roles: string[];
  addresses: IAddress;
}
