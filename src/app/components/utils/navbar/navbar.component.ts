import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
          this.router.navigate(['/home']);
        },
      },
      {
        label: 'Categories',
        icon: 'pi pi-search',
        items: [
          {
            label: 'Desktop',
            items: [
              {
                label: 'Processors',
              },
            ],
          },
          {
            label: 'Notebook',
            items: [
              {
                label: 'Notebook',
              },
            ],
          },
          {
            label: 'Monitors',
            items: [
              {
                label: 'Monitors',
              },
            ],
          },
        ],
      },
      {
        label: 'About Us',
      },
      {
        label: 'Contact Us',
        icon: 'pi pi-envelope',
      },
      {
        label: 'Special Offers',
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Features',
            icon: 'pi pi-star',
          },
          {
            label: 'Profile',
            icon: 'pi pi-user',
          },
          {
            label: 'Orders',
            icon: 'pi pi-list',
          },
          {
            label: 'Logout',
          },
        ],
      },
      {
        label: 'Login',
        command: () => {
          this.router.navigate(['/login']);
        },
      },
      {
        label: 'register',
        command: () => {
          this.router.navigate(['/register']);
        },
      },
      {
        label: 'Admin',
        icon: 'pi pi-cog',
        command: () => {
          this.router.navigate(['/admin']);
        },
      },
    ];
  }
}
