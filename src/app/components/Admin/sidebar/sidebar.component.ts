import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  visibleSidebar: boolean = false;
  constructor(private router: Router) {}
  items: any[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-fw pi-search',
      command: () => this.router.navigate(['admin']),
    },
    {
      label: 'Products',
      icon: 'pi pi-fw pi-book',
      items: [
        {
          label: 'Add',
          icon: 'pi pi-fw pi-download',
          command: () => this.router.navigate(['admin/product/add']),
        },
        {
          label: 'Management',
          icon: 'pi pi-fw pi-cog',
          command: () => this.router.navigate(['admin/product/management']),
        },
        {
          label: 'Accessibility',
          icon: 'pi pi-fw pi-eye',
          command: () => this.router.navigate(['admin/product']),
        },
      ],
    },
    {
      label: 'Categories',
      icon: 'pi pi-fw pi-book',
      items: [
        {
          label: 'Add',
          icon: 'pi pi-fw pi-download',
          command: () => this.router.navigate(['admin/category/add']),
        },
        {
          label: 'Management',
          icon: 'pi pi-fw pi-cog',
          command: () => this.router.navigate(['admin/category/management']),
        },
        {
          label: 'Accessibility',
          icon: 'pi pi-fw pi-eye',
          command: () => this.router.navigate(['admin/category']),
        },
      ],
    },
    {
      label: 'Subcategories',
      icon: 'pi pi-fw pi-book',
      items: [
        {
          label: 'Add',
          icon: 'pi pi-fw pi-download',
          command: () => this.router.navigate(['admin/subcategories/add']),
        },
        {
          label: 'Management',
          icon: 'pi pi-fw pi-cog',
          command: () =>
            this.router.navigate(['admin/subcategories/management']),
        },
        {
          label: 'Accessibility',
          icon: 'pi pi-fw pi-eye',
          command: () => this.router.navigate(['admin/subcategories']),
        },
      ],
    },
    {
      label: 'Brands',
      icon: 'pi pi-fw pi-book',
      items: [
        {
          label: 'Add',
          icon: 'pi pi-fw pi-download',
          command: () => this.router.navigate(['admin/brand/add']),
        },
        {
          label: 'Management',
          icon: 'pi pi-fw pi-cog',
          command: () => this.router.navigate(['admin/brand/management']),
        },
        {
          label: 'Accessibility',
          icon: 'pi pi-fw pi-eye',
          command: () => this.router.navigate(['admin/brand']),
        },
      ],
    },
    {
      label: 'Users',
      icon: 'pi pi-fw pi-book',
      items: [
        {
          label: 'Add',
          icon: 'pi pi-fw pi-download',
          command: () => this.router.navigate(['admin/user/add']),
        },
        {
          label: 'Management',
          icon: 'pi pi-fw pi-cog',
          command: () => this.router.navigate(['admin/user/management']),
        },
        {
          label: 'Accessibility',
          icon: 'pi pi-fw pi-eye',
          command: () => this.router.navigate(['admin/user']),
        },
      ],
    },
  ];

  sidebarWidth: string = '250px';
  ngOnInit() {
    this.updateSidebarWidth();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateSidebarWidth();
  }
  private updateSidebarWidth() {
    const width = window.innerWidth;
    this.sidebarWidth = width > 991 ? '400px' : '100%';
  }

  searchQuery: string = '';
  performSearch() {
    console.log('Search for:', this.searchQuery);
  }
}
