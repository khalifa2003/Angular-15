import { IUser } from './iuser';
export interface IReview {
  _id: string;
  title: string;
  ratings: number;
  user: IUser;
  product: string;
}
