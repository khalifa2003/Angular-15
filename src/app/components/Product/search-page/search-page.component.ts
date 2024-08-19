import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  visibleSidebar: boolean = true;

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
    this.brandService.getAllBrands().subscribe((data) => {
      this.brands = data;
    });
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
    this.subcategoryService.getSubcategories().subscribe((data) => {
      this.subcategories = data;
    });
    this.route.queryParams.subscribe((params) => {
      this.productService.searchProducts(params).subscribe((res) => {
        this.products = res;
        this.originalProducts = res;

        const brandId = params['brand'];
        const categoryId = params['category'];
        const subcategoryId = params['subcategory'];

        if (brandId) {
          this.selectedBrands = [brandId];
          this.brands = this.brands.map((brand) => ({
            ...brand,
            disabled: brand._id === brandId,
            hidden: brand._id !== brandId,
          }));
        }

        if (categoryId) {
          this.selectedCategories = [categoryId];
          this.categories = this.categories.map((category) => ({
            ...category,
            disabled: category._id === categoryId,
            hidden: category._id !== categoryId,
          }));
        }

        if (subcategoryId) {
          this.selectedSubcategories = [subcategoryId];
          this.subcategories = this.subcategories.map((subcategory) => ({
            ...subcategory,
            disabled: subcategory._id === subcategoryId,
            hidden: subcategory._id !== subcategoryId,
          }));
        }

        this.applyFilters();
      });
    });
  }

  countProductsByBrand(brandId: string): number {
    return this.originalProducts.filter(
      (product) => product.brand._id === brandId
    ).length;
  }

  countProductsByCategory(categoryId: string): number {
    return this.originalProducts.filter(
      (product) => product.category._id === categoryId
    ).length;
  }

  countProductsBySubcategory(subcategoryId: string): number {
    return this.originalProducts.filter(
      (product) => product.subcategory._id === subcategoryId
    ).length;
  }

  updateProductCounts() {
    this.brands.forEach((brand) => {
      brand.productCount = this.originalProducts.filter(
        (product) => product.brand._id === brand._id
      ).length;
    });

    this.categories.forEach((category) => {
      category.productCount = this.originalProducts.filter(
        (product) => product.category._id === category._id
      ).length;
    });

    this.subcategories.forEach((subcategory) => {
      subcategory.productCount = this.originalProducts.filter(
        (product) => product.subcategory._id === subcategory._id
      ).length;
    });
  }

  onStockChange(event: any) {
    const value = event.target.value;

    console.log(value);

    // this.selectedCategories = value;
    // this.applyFilters();
  }

  onBrandChange(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      this.selectedBrands.push(value);
    } else {
      this.selectedBrands = this.selectedBrands.filter(
        (brand) => brand !== value
      );
    }
    this.applyFilters();
  }

  onCategoryChange(event: any) {
    const value = event.target.value;
    this.subcategoryService.getSubcategories(value).subscribe((data) => {
      this.subcategories = data;
    });
    this.selectedCategories = value;
    this.applyFilters();
  }

  onSubcategoryChange(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      this.selectedSubcategories.push(value);
    } else {
      this.selectedSubcategories = this.selectedSubcategories.filter(
        (subcategory) => subcategory !== value
      );
    }
    this.applyFilters();
  }

  onPriceRangeChange(min: string | number, max: string | number) {
    this.priceRange = [Number(min), Number(max)];
    this.applyFilters();
  }

  onDiscountChange(min: string | number, max: string | number) {
    this.discountRange = [Number(min), Number(max)];
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
      const matchesStock =
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
