import { IAddress } from './iaddress';
export interface IUser {
  _id: string;
  fname: string;
  lname: string;
  slug?: string;
  phone?: string;
  profileImage: string;
  wishlist: string[];
  email: string;
  password: string;
  passwordChangedAt?: Date;
  passwordResetCode?: string;
  passwordResetExpires?: Date;
  passwordResetVerified?: string;
  active: boolean;
  addresses: IAddress;
}
