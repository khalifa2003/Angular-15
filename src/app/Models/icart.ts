import { IProduct } from './iproduct';
export interface ICart {
  _id: string;
  cartItems: [
    { product: IProduct; quantity: number; price: number; _id: string }
  ];
  totalCartPrice: number;
  user: string;
}
export interface CartRes {
  status: string;
  message: string;
  numOfCartItems: number;
  data: ICart;
}
