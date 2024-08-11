import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css'],
})
export class ProductManagementComponent {
  productDialog: boolean = true;
  products: any[] = [];
  product: any;
  selectedProducts: any[] = [];
  submitted: boolean = false;
  statuses: any[] = [];
  categories: any[];
  selectedCategory: any;

  productForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group<any>({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(50)]],
      price: ['', [Validators.required, Validators.max(2000000)]],
      quantity: [
        '',
        [Validators.required, Validators.max(1000), Validators.min(5)],
      ],
      images: fb.array<any>(['']),
      category: ['', Validators.required],
      brand: ['', Validators.required],
      subcategory: ['', Validators.required],
    });
    this.categories = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
    this.products = [
      {
        id: '1',
        name: 'Bamboo Watch',
        image: '../../../../assets/laptops2.png',
        price: 65,
        category: 'Accessories',
        rating: 5,
        inventoryStatus: 'INSTOCK',
      },
      {
        id: '2',
        name: 'Black Watch',
        image: '../../../../assets/laptops2.png',
        price: 72,
        category: 'Accessories',
        rating: 4,
        inventoryStatus: 'LOWSTOCK',
      },
      {
        id: '3',
        name: 'Blue Band',
        image: '../../../../assets/laptops2.png',
        price: 79,
        category: 'Fitness',
        rating: 3,
        inventoryStatus: 'OUTOFSTOCK',
      },
      {
        id: '4',
        name: 'Bamboo Watch',
        image: '../../../../assets/laptops2.png',
        price: 65,
        category: 'Accessories',
        rating: 5,
        inventoryStatus: 'INSTOCK',
      },
      {
        id: '5',
        name: 'Black Watch',
        image: '../../../../assets/laptops2.png',
        price: 72,
        category: 'Accessories',
        rating: 4,
        inventoryStatus: 'LOWSTOCK',
      },
      {
        id: '6',
        name: 'Blue Band',
        image: '../../../../assets/laptops2.png',
        price: 79,
        category: 'Fitness',
        rating: 3,
        inventoryStatus: 'OUTOFSTOCK',
      },
      {
        id: '7',
        name: 'Bamboo Watch',
        image: '../../../../assets/laptops2.png',
        price: 65,
        category: 'Accessories',
        rating: 5,
        inventoryStatus: 'INSTOCK',
      },
      {
        id: '8',
        name: 'Black Watch',
        image: '../../../../assets/laptops2.png',
        price: 72,
        category: 'Accessories',
        rating: 4,
        inventoryStatus: 'LOWSTOCK',
      },
      {
        id: '9',
        name: 'Blue Band',
        image: '../../../../assets/laptops2.png',
        price: 79,
        category: 'Fitness',
        rating: 3,
        inventoryStatus: 'OUTOFSTOCK',
      },
      {
        id: '10',
        name: 'Bamboo Watch',
        image: '../../../../assets/laptops2.png',
        price: 65,
        category: 'Accessories',
        rating: 5,
        inventoryStatus: 'INSTOCK',
      },
      {
        id: '11',
        name: 'Bamboo Watch',
        image: '../../../../assets/laptops2.png',
        price: 65,
        category: 'Accessories',
        rating: 5,
        inventoryStatus: 'INSTOCK',
      },
      {
        id: '12',
        name: 'Black Watch',
        image: '../../../../assets/laptops2.png',
        price: 72,
        category: 'Accessories',
        rating: 4,
        inventoryStatus: 'LOWSTOCK',
      },
      {
        id: '13',
        name: 'Blue Band',
        image: '../../../../assets/laptops2.png',
        price: 79,
        category: 'Fitness',
        rating: 3,
        inventoryStatus: 'OUTOFSTOCK',
      },
      {
        id: '14',
        name: 'Bamboo Watch',
        image: '../../../../assets/laptops2.png',
        price: 65,
        category: 'Accessories',
        rating: 5,
        inventoryStatus: 'INSTOCK',
      },
      {
        id: '15',
        name: 'Black Watch',
        image: '../../../../assets/laptops2.png',
        price: 72,
        category: 'Accessories',
        rating: 4,
        inventoryStatus: 'LOWSTOCK',
      },
      {
        id: '16',
        name: 'Blue Band',
        image: '../../../../assets/laptops2.png',
        price: 79,
        category: 'Fitness',
        rating: 3,
        inventoryStatus: 'OUTOFSTOCK',
      },
      {
        id: '17',
        name: 'Bamboo Watch',
        image: '../../../../assets/laptops2.png',
        price: 65,
        category: 'Accessories',
        rating: 5,
        inventoryStatus: 'INSTOCK',
      },
      {
        id: '18',
        name: 'Black Watch',
        image: '../../../../assets/laptops2.png',
        price: 72,
        category: 'Accessories',
        rating: 4,
        inventoryStatus: 'LOWSTOCK',
      },
      {
        id: '19',
        name: 'Blue Band',
        image: '../../../../assets/laptops2.png',
        price: 79,
        category: 'Fitness',
        rating: 3,
        inventoryStatus: 'OUTOFSTOCK',
      },
      {
        id: '20',
        name: 'Bamboo Watch',
        image: '../../../../assets/laptops2.png',
        price: 65,
        category: 'Accessories',
        rating: 5,
        inventoryStatus: 'INSTOCK',
      },
      {
        id: '21',
        name: 'Black Watch',
        image: '../../../../assets/laptops2.png',
        price: 72,
        category: 'Accessories',
        rating: 4,
        inventoryStatus: 'LOWSTOCK',
      },
      {
        id: '22',
        name: 'Blue Band',
        image: '../../../../assets/laptops2.png',
        price: 79,
        category: 'Fitness',
        rating: 3,
        inventoryStatus: 'OUTOFSTOCK',
      },
      {
        id: '23',
        name: 'Bamboo Watch',
        image: '../../../../assets/laptops2.png',
        price: 65,
        category: 'Accessories',
        rating: 5,
        inventoryStatus: 'INSTOCK',
      },
      {
        id: '24',
        name: 'Black Watch',
        image: '../../../../assets/laptops2.png',
        price: 72,
        category: 'Accessories',
        rating: 4,
        inventoryStatus: 'LOWSTOCK',
      },
      {
        id: '25',
        name: 'Blue Band',
        image: '../../../../assets/laptops2.png',
        price: 79,
        category: 'Fitness',
        rating: 3,
        inventoryStatus: 'OUTOFSTOCK',
      },
      {
        id: '26',
        name: 'Bamboo Watch',
        image: '../../../../assets/laptops2.png',
        price: 65,
        category: 'Accessories',
        rating: 5,
        inventoryStatus: 'INSTOCK',
      },
      {
        id: '27',
        name: 'Black Watch',
        image: '../../../../assets/laptops2.png',
        price: 72,
        category: 'Accessories',
        rating: 4,
        inventoryStatus: 'LOWSTOCK',
      },
      {
        id: '28',
        name: 'Blue Band',
        image: '../../../../assets/laptops2.png',
        price: 79,
        category: 'Fitness',
        rating: 3,
        inventoryStatus: 'OUTOFSTOCK',
      },
      {
        id: '29',
        name: 'Bamboo Watch',
        image: '../../../../assets/laptops2.png',
        price: 65,
        category: 'Accessories',
        rating: 5,
        inventoryStatus: 'INSTOCK',
      },
      {
        id: '30',
        name: 'Black Watch',
        image: '../../../../assets/laptops2.png',
        price: 72,
        category: 'Accessories',
        rating: 4,
        inventoryStatus: 'LOWSTOCK',
      },
    ];
    this.statuses = [
      { label: 'INSTOCK', value: 'INSTOCK' },
      { label: 'LOWSTOCK', value: 'LOWSTOCK' },
      { label: 'OUTOFSTOCK', value: 'OUTOFSTOCK' },
    ];
  }
  get f() {
    return this.productForm.controls;
  }
  ngOnInit() {}
  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }
  deleteSelectedProducts() {
    if (this.selectedProducts && this.selectedProducts.length > 0) {
      this.products = this.products.filter(
        (val) => !this.selectedProducts.includes(val)
      );
      alert('Products Deleted Successfully');
    }
  }
  editProduct(product: any) {
    console.log(product);

    this.product = { ...product };
    this.productDialog = true;
  }
  deleteProduct(product: any) {
    this.products = this.products.filter((val) => val.id !== product.id);
    this.product = {};
    alert('Product Deleted Successfully');
  }
  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }
  saveProduct() {
    this.submitted = true;
    if (this.product.name.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        alert('Product Updated Successfully');
      } else {
        this.product.id = this.createId();
        this.product.image = 'product-placeholder.svg';
        this.products.push(this.product);
        alert('Product Created Successfully');
      }
      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    }
  }
  findIndexById(id: string): number {
    return this.products.findIndex((product) => product.id === id);
  }
  createId(): string {
    let id = '';
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
