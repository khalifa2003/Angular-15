import { Component, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnDestroy {
  items: MenuItem[] = [];
  authSubscription: Subscription;

  constructor(private router: Router, private authService: AuthService) {
    this.authSubscription = this.authService.currentUser.subscribe(() => {
      this.updateMenuItems();
    });
    this.updateMenuItems();
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
      { label: 'About Us' },
      { label: 'Contact Us', icon: 'pi pi-envelope' },
      { label: 'Special Offers' },
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
}
