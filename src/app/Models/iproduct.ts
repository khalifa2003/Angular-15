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
  subcategory: string;
  images: string[];
  category: ICategory;
  subcategories?: ISubcategory;
  brand: IBrand;
  averageRating?: number;
  reviewCounts?: number;
  ratingsAverage: number;
  ratingsQuantity?: number;
}
