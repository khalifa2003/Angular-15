import { ICategory } from './icategory';

export interface ISubcategory {
  disabled: any;
  productCount: number;
  _id: string;
  name: string;
  category: ICategory;
}
