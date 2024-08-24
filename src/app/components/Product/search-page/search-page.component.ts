import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IBrand } from 'src/app/Models/ibrand';
import { ICategory } from 'src/app/Models/icategory';
import { IProduct } from 'src/app/Models/iproduct';
import { ISubcategory } from 'src/app/Models/isubcategory';
import { BrandService } from 'src/app/services/brand.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent implements OnInit {
  visibleSidebar: boolean = false;

  originalProducts: IProduct[] = [];
  subcategories: ISubcategory[] = [];
  categories: ICategory[] = [];
  products: IProduct[] = [];
  brands: IBrand[] = [];

  selectedSubcategories: string[] = [];
  selectedCategories: string[] = [];
  selectedDiscount: number[] = [];
  selectedBrands: string[] = [];
  selectedStock: string[] = [];
  priceRange: number[] = [0, 10000];
  selectedSort: string = 'relevance';
  query: string = '';
  min: number = 0;
  max: number = 10000;

  constructor(
    private subcategoryService: SubcategoryService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private brandService: BrandService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
    this.route.queryParams.subscribe((params) => {
      this.applyQueryParams(params);
      this.applyFilters();
    });
  }

  loadInitialData() {
    this.brandService.getAllBrands().subscribe((data) => (this.brands = data));
    this.categoryService
      .getAllCategories()
      .subscribe((data) => (this.categories = data));
    this.subcategoryService
      .getSubcategories()
      .subscribe((data) => (this.subcategories = data));
  }

  applyQueryParams(params: Params) {
    this.productService.searchProducts(params).subscribe((res) => {
      this.originalProducts = this.products = res;
      this.min = Math.min(...this.products.map((product) => product.price));
      this.max = Math.max(...this.products.map((product) => product.price));
      this.priceRange = [this.min, this.max];

      this.selectedBrands = params['brand'] ? [params['brand']] : [];
      this.selectedCategories = params['category'] ? [params['category']] : [];
      this.selectedSubcategories = params['subcategory']
        ? [params['subcategory']]
        : [];

      if (params['category']) {
        this.categories = this.categories.filter(
          (category) => category._id === params['category']
        );
      }
      if (params['brand']) {
        this.brands = this.brands.filter(
          (brand) => brand._id === params['brand']
        );
      }
      if (params['subcategory']) {
        this.subcategories = this.subcategories.filter(
          (subcategory) => subcategory._id === params['subcategory']
        );
      }
    });
  }

  countProductsModel(id: string, modelName: string): number {
    switch (modelName) {
      case 'category':
        return this.originalProducts.filter(
          (product) => product.category._id === id
        ).length;
      case 'stock':
        return this.originalProducts.filter((product) => product.stock === id)
          .length;
      case 'brand':
        return this.originalProducts.filter(
          (product) => product.brand._id === id
        ).length;
      case 'discount':
        return this.originalProducts.filter((product) => product.discount > 0)
          .length;
      case 'subcategory':
        return this.originalProducts.filter(
          (product) => product.subcategory._id === id
        ).length;
      default:
        return 0;
    }
  }

  onModelChange(event: any, model: string) {
    const inputElement = event.target as HTMLInputElement;
    if (model == 'stock') {
      if (inputElement.checked) {
        this.selectedStock.push(inputElement.value);
      } else {
        this.selectedStock = this.selectedStock.filter(
          (status) => status !== inputElement.value
        );
      }
    } else if (model == 'discount') {
      if (inputElement.checked) {
        this.selectedDiscount = [0];
      } else {
        this.selectedDiscount = [];
      }
    } else if (model == 'brand') {
      if (inputElement.checked) {
        this.selectedBrands.push(inputElement.value);
      } else {
        this.selectedBrands = this.selectedBrands.filter(
          (brand) => brand !== inputElement.value
        );
      }
    } else if (model == 'category') {
      this.subcategoryService
        .getSubcategories(inputElement.value)
        .subscribe((data) => {
          this.subcategories = data;
        });
      this.selectedCategories = [inputElement.value];
    } else if (model == 'subcategory') {
      if (inputElement.checked) {
        this.selectedSubcategories.push(inputElement.value);
      } else {
        this.selectedSubcategories = this.selectedSubcategories.filter(
          (subcategory) => subcategory !== inputElement.value
        );
      }
    }
    this.applyFilters();
  }

  onSortChange(event: Event) {
    const sortOption = (event.target as HTMLSelectElement).value;
    this.selectedSort = sortOption;
    this.applyFilters(); // Reapply the filters to include sorting
  }

  sortProducts(products: IProduct[]): IProduct[] {
    switch (this.selectedSort) {
      case 'priceAsc':
        return products.sort((a, b) => a.price - b.price);
      case 'priceDesc':
        return products.sort((a, b) => b.price - a.price);
      case 'rating':
        return products.sort((a, b) => b.ratingsAverage - a.ratingsAverage);
      case 'date':
        return products.sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime(); // Assuming createdAt is a property
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
        });
      default:
        return products;
    }
  }

  applyFilters() {
    this.products = this.originalProducts.filter((product) => {
      const matchesCategory =
        this.selectedCategories.length === 0 ||
        this.selectedCategories.includes(product.category._id);
      const matchesBrand =
        this.selectedBrands.length === 0 ||
        this.selectedBrands.includes(product.brand._id);
      const matchesSubcategory =
        this.selectedSubcategories.length === 0 ||
        this.selectedSubcategories.includes(product.subcategory._id);
      const matchesStock =
        this.selectedStock.length === 0 ||
        this.selectedStock.includes(product.stock);
      const matchesDiscount =
        this.selectedDiscount.length === 0 ||
        this.selectedDiscount[0] != product.discount;
      const matchesPrice =
        product.price >= this.priceRange[0] &&
        product.price <= this.priceRange[1];
      const matchesQuery =
        product.price >= this.priceRange[0] &&
        product.title.toLowerCase().includes(this.query);

      return (
        matchesBrand &&
        matchesCategory &&
        matchesSubcategory &&
        matchesPrice &&
        matchesStock &&
        matchesDiscount &&
        matchesQuery
      );
    });
    this.products = this.sortProducts(this.products);
  }

  onPriceRangeChange(range: number[]) {
    this.priceRange = range;
    this.applyFilters();
  }

  onFilter(event: any) {
    this.query = (event.target as HTMLInputElement).value.toLowerCase();
    this.applyFilters();
  }

  
}
