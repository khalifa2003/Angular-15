import { IAddress } from './iaddress';
import { IProduct } from './iproduct';
import { IUser } from './iuser';

export interface IOrder {
  _id: string;
  user: IUser;
  cartItems: {
    product: IProduct;
    quantity: number;
    price: number;
  }[];
  taxPrice: number;
  shippingAddress: IAddress;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  updatedAt?: Date;
}
