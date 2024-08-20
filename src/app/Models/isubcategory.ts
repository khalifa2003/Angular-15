import { ICategory } from './icategory';

export interface ISubcategory {
  _id: string;
  name: string;
  category: ICategory;
  productCount: number;
}
