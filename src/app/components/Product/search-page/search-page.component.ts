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
  products: IProduct[] = [];
  categories: ICategory[] = [];
  subcategories: ISubcategory[] = [];
  brands: IBrand[] = [];

  selectedBrands: string[] = [];
  selectedCategories: string[] = [];
  selectedSubcategories: string[] = [];
  priceRange: [number, number] = [0, Infinity];
  discountRange: [number, number] = [0, 100];

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
    if (modelName == 'category') {
      return this.originalProducts.filter(
        (product) => product.category._id === id
      ).length;
    } else if (modelName == 'brand') {
      return this.originalProducts.filter((product) => product.brand._id === id)
        .length;
    } else if (modelName == 'discount') {
      return this.products.filter((product) => product.discount > 0).length;
    } else if (modelName == 'stock') {
      return this.originalProducts.filter((product) => product.stock == id)
        .length;
    } else {
      return this.originalProducts.filter(
        (product) => product.subcategory._id === id
      ).length;
    }
  }

  onStockChange(event: any) {
    this.applyFilters();
    const value = event.target.value;
    if (event.target.checked) {
      this.products = this.products.filter((product) => product.stock == value);
    } else {
      this.applyFilters();
    }
  }

  onDiscountChange(event: any) {
    if (event.target.checked) {
      this.products = this.products.filter((product) => product.discount > 0);
    } else {
      this.applyFilters();
    }
  }

  onBrandChange(event: any) {
    if (event.target.checked) {
      this.selectedBrands.push(event.target.value);
    } else {
      this.selectedBrands = this.selectedBrands.filter(
        (brand) => brand !== event.target.value
      );
    }
    this.applyFilters();
  }

  onCategoryChange(event: any) {
    this.subcategoryService
      .getSubcategories(event.target.value)
      .subscribe((data) => {
        this.subcategories = data;
      });
    this.selectedCategories = event.target.value;
    this.applyFilters();
  }

  onSubcategoryChange(event: any) {
    if (event.target.checked) {
      this.selectedSubcategories.push(event.target.value);
    } else {
      this.selectedSubcategories = this.selectedSubcategories.filter(
        (subcategory) => subcategory !== event.target.value
      );
    }
    this.applyFilters();
  }

  onPriceRangeChange(min: string | number, max: string | number) {
    this.priceRange = [Number(min), Number(max)];
    this.applyFilters();
  }

  getValueFromEvent(event: Event): string {
    const target = event.target as HTMLInputElement;
    return target.value;
  }

  applyFilters() {
    this.products = this.originalProducts.filter((product) => {
      const matchesBrand =
        this.selectedBrands.length === 0 ||
        this.selectedBrands.includes(product.brand._id);
      const matchesCategory =
        this.selectedCategories.length === 0 ||
        this.selectedCategories.includes(product.category._id);
      const matchesSubcategory =
        this.selectedSubcategories.length === 0 ||
        this.selectedSubcategories.includes(product.subcategory._id);
      const matchesPrice =
        product.price >= this.priceRange[0] &&
        product.price <= this.priceRange[1];

      return (
        matchesBrand && matchesCategory && matchesSubcategory && matchesPrice
      );
    });
  }

  onFilter(event: any) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.products = this.originalProducts.filter((product) =>
      product.title.toLowerCase().includes(query)
    );
    this.applyFilters();
  }
}
