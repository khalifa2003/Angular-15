import { IBrand } from './ibrand';
import { ICategory } from './icategory';
import { ISubcategory } from './isubcategory';

export interface IProduct {
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  subcategory: ISubcategory;
  images: string[];
  category: ICategory;
  brand: IBrand;
  ratingsAverage: number;
  ratingsQuantity?: number;
  sold?: number;
  priceAfterDiscount: number;
  discount: number;
  stock: string;
  createdAt: Date;
  updatedAt: Date;
}
