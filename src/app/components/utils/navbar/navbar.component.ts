import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { ICategory } from 'src/app/Models/icategory';
import { CategoryService } from 'src/app/services/category.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { ISubcategory } from 'src/app/Models/isubcategory';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/Models/iproduct';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnDestroy, OnInit {
  items: MenuItem[] = [];
  authSubscription: Subscription;

  categories: ICategory[] = [];
  subcategories: ISubcategory[] = [];
  searchResults: IProduct[] = [];
  searchTerm: any = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private subcategoryService: SubcategoryService
  ) {
    this.authSubscription = this.authService.currentUser.subscribe(() => {
      this.updateMenuItems();
    });
    this.updateMenuItems();
  }
  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categories = res;
    });
  }
  getSubcategories(category: string) {
    this.subcategoryService.getSubcategories(category).subscribe((data) => {
      this.subcategories = data;
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  updateMenuItems() {
    const isAuthenticated = this.authService.isAuthenticated();
    const isAdmin = this.authService.isAdmin();

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => this.router.navigate(['/home']),
      },
      {
        label: 'Categories',
        icon: 'pi pi-search',
        items: [
          { label: 'Desktop', items: [{ label: 'Processors' }] },
          { label: 'Notebook', items: [{ label: 'Notebook' }] },
          { label: 'Monitors', items: [{ label: 'Monitors' }] },
        ],
      },
      { label: 'Special Offers' },
      { label: 'About Us', command: () => this.router.navigate(['/about']) },
      {
        label: 'Contact Us',
        icon: 'pi pi-envelope',
        command: () => this.router.navigate(['/contact']),
      },
      {
        label: 'Users',
        visible: isAuthenticated,
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Profile',
            icon: 'pi pi-user',
            command: () => this.router.navigate(['/profile']),
          },
          {
            label: 'Address',
            icon: 'pi pi-location',
            command: () => this.router.navigate(['/address']),
          },
          {
            label: 'Orders',
            icon: 'pi pi-list',
            command: () => this.router.navigate(['/orders']),
          },
          {
            label: 'Logout',
            command: () => {
              this.authService.logout();
            },
          },
        ],
      },
      {
        label: 'Login/Register',
        command: () => this.router.navigate(['/login']),
        visible: !isAuthenticated,
      },
      {
        label: 'Admin',
        icon: 'pi pi-cog',
        command: () => this.router.navigate(['/admin']),
        visible: isAdmin,
      },
    ];
  }

  getProductByCategory(item: ICategory) {
    this.router.navigate(['/products'], {
      queryParams: { category: item._id },
    });
  }

  getProductBySubCategory(item: ISubcategory) {
    this.router.navigate(['/products'], {
      queryParams: { subcategory: item._id },
    });
  }

  onSearch(): void {
    if (this.searchTerm.trim() !== '') {
      this.productService
        .searchProducts({ title: this.searchTerm })
        .subscribe((products) => {
          console.log(this.searchResults);
          this.searchResults = products;
        });
    } else {
      this.searchResults = [];
    }
  }

  navigate(product: IProduct) {}
  reloadPage() {
    if (this.searchTerm != '') {
      this.router.navigate(['/product'], {
        queryParams: { title: this.searchTerm },
      });
      this.searchTerm = '';
      this.searchResults = [];
    }
  }
}
