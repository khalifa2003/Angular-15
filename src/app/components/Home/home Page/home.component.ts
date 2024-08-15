import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { BrandService } from 'src/app/services/brand.service';
import { IBrand } from 'src/app/Models/ibrand';
import { ICategory } from 'src/app/Models/icategory';
import { IProduct } from 'src/app/Models/iproduct';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  responsiveOptions: any[];

  ids: { id: string; name: string; products: IProduct[] }[] = [
    { id: '665b9e7eee20a57f1c86a3df', name: 'NOTEBOOK', products: [] },
    { id: '665b9e66ee20a57f1c86a3dd', name: 'DESKTOP', products: [] },
    { id: '665b9e9cee20a57f1c86a3e1', name: 'STORAGE', products: [] },
    { id: '665b9ebaee20a57f1c86a3e3', name: 'MONITOR', products: [] },
    { id: '665b9ee3ee20a57f1c86a3e7', name: 'ACCESSORIES', products: [] },
  ];

  categories: ICategory[] = [];
  brands: IBrand[] = [];
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private brandService: BrandService
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1599px',
        numVisible: 6,
        numScroll: 2,
      },
      {
        breakpoint: '1199px',
        numVisible: 4,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit() {
    this.getCategories();
    this.getProducts();
    this.getBrands();
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  getBrands() {
    this.brandService.getAllBrands().subscribe((res) => {
      this.brands = res;
    });
  }

  async getProducts() {
    await this.ids.map((id) => {
      this.productService
        .searchProducts({ category: id.id })
        .subscribe((res) => {
          id.products = res;
        });
    });
    for (let i = 0; i < this.ids.length; i++) {}
  }
}
