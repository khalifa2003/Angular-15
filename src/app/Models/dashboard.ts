import { IAddress } from './iaddress';
import { IProduct } from './iproduct';
import { IUser } from './iuser';

export interface bestSelling {
  _id: string;
  title: string;
  totalSales: number;
}
export interface commentsStats {
  respondedCommentsCount: number;
  unreadCommentsCount: number;
}
export interface customersStats {
  customersCount: number;
  newCustomersCount: number;
}
export interface notifications {
  _id: string;
  title: string;
  product: string;
  ratings: number;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
}
export interface ordersStats {
  newOrdersCount: number;
  ordersCount: number;
}
export interface recentSales {
  _id: string;
  user: IUser;
  cartItems: {
    _id: string;
    product: IProduct;
    quantity: number;
    price: number;
  }[];
  isDelivered: boolean;
  isPaid: boolean;
  paymentMethodType: string;
  shippingAddress: IAddress;
  shippingPrice: number;
  taxPrice: number;
  totalOrderPrice: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface salesOverview {
  _id: string;
  totalSales: number;
}
export interface Dashboard {
  ordersStats: ordersStats;
  commentsStats: commentsStats;
  bestSellingProducts: bestSelling[];
  revenueStats: number;
  customersStats: customersStats;
  recentSales: recentSales[];
  notifications: notifications[];
  salesOverview: salesOverview[];
}
