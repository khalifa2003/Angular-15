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
  shippingAddress: {
    address: string;
    phone: string;
    city: string;
    postalCode: string;
    state: string;
    country: string;
  };
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
}
