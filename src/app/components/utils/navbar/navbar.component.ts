import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { firstValueFrom, Subscription } from 'rxjs';
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
export class NavbarComponent implements OnDestroy {
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
    private messageService: MessageService,
    private subcategoryService: SubcategoryService
  ) {
    this.authSubscription = this.authService.currentUser.subscribe(() => {
      this.updateMenuItems();
    });
    this.updateMenuItems();
  }

  async loadSubcategories(categoryId: string) {
    try {
      const subcategories = await firstValueFrom(
        this.subcategoryService.getSubcategories(categoryId)
      );
      return subcategories.map((subcategory: { name: any; _id: any }) => ({
        label: subcategory.name,
        command: () =>
          this.router.navigate(['/product'], {
            queryParams: { subcategory: subcategory._id },
          }),
      }));
    } catch (error) {
      console.error('Failed to load subcategories', error);
      return [];
    }
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  async updateMenuItems() {
    const isAuthenticated = this.authService.isAuthenticated();
    const isAdmin = this.authService.isAdmin();

    this.categories = await firstValueFrom(
      this.categoryService.getAllCategories()
    );

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => this.router.navigate(['/home']),
      },
      {
        label: 'Categories',
        icon: 'pi pi-search',
        items: await Promise.all(
          this.categories.map(async (category) => ({
            label: category.name,
            icon: 'pi pi-arrow-right',
            command: () =>
              this.router.navigate(['/product'], {
                queryParams: { category: category._id },
              }),
            items: await this.loadSubcategories(category._id),
          }))
        ),
      },
      {
        label: 'Special Offers',
        icon: 'pi pi-gift',
        command: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'No Special Offers Right Now',
            detail: 'Coming Soon...',
          });
        },
      },
      {
        label: 'About Us',
        icon: 'pi pi-info-circle',
        command: () => this.router.navigate(['/about']),
      },
      {
        label: 'Contact Us',
        icon: 'pi pi-envelope',
        command: () => this.router.navigate(['/contact']),
      },
      {
        label: '',
        visible: isAuthenticated,
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Profile',
            icon: 'pi pi-user',
            command: () => this.router.navigate(['/user/profile']),
          },
          {
            label: 'Orders',
            command: () => this.router.navigate(['/user/orders']),
            icon: 'pi pi-shopping-cart',
          },
          {
            label: 'Wishlist',
            command: () => this.router.navigate(['/user/wishlist']),
            icon: 'pi pi-heart',
          },
          {
            label: 'Cart',
            command: () => this.router.navigate(['/user/cart']),
            icon: 'pi pi-shopping-cart',
          },
          {
            label: 'Logout',
            command: () => {
              this.authService.logout();
            },
            icon: 'pi pi-power-off',
          },
        ],
      },
      {
        label: 'Login/Register',
        command: () => this.router.navigate(['/login']),
        visible: !isAuthenticated,
        icon: 'pi pi-fw pi-sign-in',
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
          this.searchResults = products;
        });
    } else {
      this.searchResults = [];
    }
  }

  navigate(product: IProduct) {
    this.router.navigate(['/product', product._id]);
    this.searchTerm = '';
    this.searchResults = [];
  }

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
