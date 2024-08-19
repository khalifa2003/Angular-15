import { ICategory } from './icategory';

export interface ISubcategory {
  productCount: number;
  disabled: any;
  _id: string;
  name: string;
  category: ICategory;
}
