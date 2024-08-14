import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { IBrand } from 'src/app/Models/ibrand';
import { ICategory } from 'src/app/Models/icategory';
import { IProduct } from 'src/app/Models/iproduct';
import { CategoryService } from 'src/app/services/category.service';
import { BrandService } from '../../../services/brand.service';
import { SubcategoryService } from '../../../services/subcategory.service';
import { ISubcategory } from 'src/app/Models/isubcategory';
import { ProductService } from 'src/app/services/product.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css'],
})
export class ProductManagementComponent implements OnInit {
  productDialog: boolean = false;
  product: IProduct = {} as IProduct;
  productForm: FormGroup;
  selectedProducts: IProduct[] = [];

  subcategories: ISubcategory[] = [];
  categories: ICategory[] = [];
  products: IProduct[] = [];
  brands: IBrand[] = [];

  constructor(
    private fb: FormBuilder,
    private subcategoryService: SubcategoryService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private messageService: MessageService,
    private brandService: BrandService
  ) {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(50)]],
      price: ['', [Validators.required, Validators.max(2000000)]],
      quantity: [
        '',
        [Validators.required, Validators.max(1000), Validators.min(5)],
      ],
      images: fb.array(['']),
      category: ['', Validators.required],
      brand: ['', Validators.required],
      subcategory: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getProducts();
    this.getCategories();
    this.getBrands();
    this.getSubcategories();
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

  getSubcategories() {
    if (this.productForm.value.category != '') {
      this.subcategoryService
        .getSubcategories(this.productForm.value.category)
        .subscribe((res) => {
          console.log(this.productForm.value.category);

          console.log(res);
          this.subcategories = res;
        });
    }
  }

  getProducts() {
    this.productService.getAllProducts().subscribe((res) => {
      this.products = res;
    });
  }

  get f() {
    return this.productForm.controls;
  }

  openNew() {
    this.product = {} as IProduct;
    this.productForm.reset();
    this.productDialog = true;
  }

  openEdit(product: IProduct) {
    this.product = product;
    this.productForm = this.fb.group({
      title: [product.title, [Validators.required, Validators.minLength(3)]],
      description: [
        product.description,
        [Validators.required, Validators.minLength(50)],
      ],
      price: [product.price, [Validators.required, Validators.max(2000000)]],
      quantity: [
        product.quantity,
        [Validators.required, Validators.max(1000), Validators.min(5)],
      ],
      images: this.fb.array(product.images),
      category: [product.category, Validators.required],
      brand: [product.brand, Validators.required],
      subcategory: [product.subcategory, Validators.required],
    });

    this.productDialog = true;
  }

  deleteSelectedProducts() {
    if (this.selectedProducts && this.selectedProducts.length > 0) {
      this.products = this.products.filter((product) => {
        if (this.selectedProducts.includes(product)) {
          this.productService.deleteProduct(product._id).subscribe((res) => {
            this.getProducts();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `'${product.title}' removed Successfully`,
            });
          });
        }
      });
    }
  }

  deleteProduct(product: any) {
    this.productService.deleteProduct(product._id).subscribe((res) => {
      this.getProducts();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `'${product.title}' removed Successfully`,
      });
    });
  }

  submitAddProduct() {
    if (this.productForm.valid) {
      this.categoryService
        .createCategory(this.productForm.value)
        .subscribe((res) => {
          this.getCategories();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `${this.productForm.value.name} added Successfully`,
          });
          this.productDialog = false;
          this.productForm.reset();
        });
    }
  }

  submitEditProduct() {
    if (this.productForm.valid) {
      this.categoryService
        .editCategory(this.product._id, this.productForm.value)
        .subscribe((res) => {
          this.getCategories();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `'${this.productForm.value.name}' edited Successfully`,
          });
          this.productDialog = false;
          this.productForm.reset();
          this.product = {} as IProduct;
        });
    }
  }

  @ViewChild('dt') dt: Table = {} as Table;
  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement?.value || '';
    this.dt.filterGlobal(value, 'contains');
  }

  get allImages() {
    return this.productForm.get('images') as FormArray;
  }

  addImage(event: any) {
    this.allImages.push(this.fb.control(''));
    event.target?.classList.add('d-none');
  }
}
