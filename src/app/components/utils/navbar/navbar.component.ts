import { Component, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import {
  debounceTime,
  distinctUntilChanged,
  firstValueFrom,
  Subject,
  Subscription,
  switchMap,
} from 'rxjs';
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

  searchTerm: string = '';
  searchResults: IProduct[] = [];
  private searchSubject = new Subject<string>();

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
    this.searchSubject
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((term) =>
          term.trim() ? this.productService.searchProducts({ title: term }) : []
        )
      )
      .subscribe((products) => {
        this.searchResults = products;
      });
  }

  async loadSubcategories(categoryId: string) {
    const subcategories = await firstValueFrom(
      this.subcategoryService.getSubcategories(categoryId)
    );
    return subcategories.map((subcategory: ISubcategory) => ({
      label: subcategory.name,
      command: () =>
        this.router.navigate(['/product'], {
          queryParams: { subcategory: subcategory._id },
        }),
    }));
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

  onSearch(): void {
    this.searchSubject.next(this.searchTerm);
  }

  navigate(product: IProduct): void {
    this.router.navigate(['/product', product._id]);
    this.clearSearch();
  }

  reloadPage(): void {
    if (this.searchTerm.trim() !== '') {
      this.router.navigate(['/product'], {
        queryParams: { title: this.searchTerm },
      });
      this.clearSearch();
    }
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.searchResults = [];
  }

  // hid search search results

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
    if (
      targetElement &&
      !targetElement.closest('.search-input') &&
      !targetElement.closest('.search-results')
    ) {
      this.clearSearch();
    }
  }
}
