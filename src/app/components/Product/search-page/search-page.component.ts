import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { IBrand } from 'src/app/Models/ibrand';
import { ICategory } from 'src/app/Models/icategory';
import { IProduct } from 'src/app/Models/iproduct';
import { BrandService } from 'src/app/services/brand.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent {
  filterPriceForm: FormGroup = {} as FormGroup;

  sortOptions: { label: string; value: string }[] = [];
  sortOrder: number = 0;
  sortField: string = '';

  products: IProduct[] = [];
  categories: ICategory[] = [];
  brands: IBrand[] = [];
  params: any;
  sort: string = 'relevance';
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private brandService: BrandService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.brandService.getAllBrands().subscribe((data) => {
      this.brands = data;
    });
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
    this.route.queryParams.subscribe((params) => {
      if (params['min']) {
        this.filterPriceForm.get('min')?.setValue(+params['min']);
      }
      if (params['max']) {
        this.filterPriceForm.get('max')?.setValue(+params['max']);
      }
    });
    this.route.queryParams.subscribe((params) => {
      this.productService.searchProducts(params).subscribe((res) => {
        this.products = res;

        this.filterPriceForm = this.fb.group({
          min: [
            Math.min(...this.products.map((product) => product.price)),
            Validators.min(
              Math.min(...this.products.map((product) => product.price))
            ),
          ],
          max: [
            Math.max(...this.products.map((product) => product.price)),
            Validators.max(
              Math.max(...this.products.map((product) => product.price))
            ),
          ],
        });
      });
    });
    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' },
    ];
  }

  onSortChange(event: any) {
    const value = event.value;
    this.sortOrder = value.startsWith('!') ? -1 : 1;
    this.sortField = value.replace('!', '');
  }

  onFilter(dv: any, event: Event) {
    dv.filter((event.target as HTMLInputElement).value);
  }

  getStatusClass(status: string) {
    return {
      'badge-success': status === 'INSTOCK',
      'badge-danger': status === 'OUTOFSTOCK',
      'badge-warning': status === 'LOWSTOCK',
    };
  }

  updateQueryParams(): void {
    const queryParams: any = {};

    if (this.filterPriceForm.value.min !== null) {
      queryParams.min = this.filterPriceForm.value.min;
    }

    if (this.filterPriceForm.value.max !== null) {
      queryParams.max = this.filterPriceForm.value.max;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }
  onFilterChange() {
    if (this.sort === 'priceAsc') {
      this.products.sort((a, b) => a.price - b.price);
    } else if (this.sort === 'priceDesc') {
      this.products.sort((a, b) => b.price - a.price);
    }
  }

  filterPrice() {
    this.updateQueryParams();
  }
}
