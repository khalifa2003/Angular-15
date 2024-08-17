import { Component, Input } from '@angular/core';
import { IBrand } from 'src/app/Models/ibrand';
import { ICategory } from 'src/app/Models/icategory';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-side-filter',
  templateUrl: './side-filter.component.html',
  styleUrls: ['./side-filter.component.css'],
})
export class SideFilterComponent {
  @Input() brands: IBrand[] = [];
  @Input() categories: ICategory[] = [];

  // selectedCategories: Set<string> = new Set();
  // selectedBrands: Set<string> = new Set();

  // onCategoryChange(event: any): void {
  //   const category = event.target.value;
  //   if (event.target.checked) {
  //     this.selectedCategories.add(category);
  //   } else {
  //     this.selectedCategories.delete(category);
  //   }
  //   this.updateQueryParams();
  // }

  // onBrandChange(event: any): void {
  //   const brand = event.target.value;
  //   if (event.target.checked) {
  //     this.selectedBrands.add(brand);
  //   } else {
  //     this.selectedBrands.delete(brand);
  //   }
  //   this.updateQueryParams();
  // }

  // updateQueryParams(): void {
  //   const queryParams: any = {};

  //   if (this.selectedCategories.size >= 0) {
  //     queryParams.category = Array.from(this.selectedCategories).join(',');
  //   }

  //   if (this.selectedBrands.size >= 0) {
  //     queryParams.brand = Array.from(this.selectedBrands).join(',');
  //   }
  //   this.router.navigate([], {
  //     relativeTo: this.route,
  //     queryParams: queryParams,
  //     queryParamsHandling: 'merge',
  //   });
  // }

  // constructor(private router: Router, private route: ActivatedRoute) {}
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/dashboard'],
      },
      {
        label: 'UI Components',
        icon: 'pi pi-fw pi-sitemap',
        items: [
          {
            label: 'Form Layout',
            routerLink: ['/form-layout'],
          },
          {
            label: 'Input',
            routerLink: ['/input'],
          },
          // Add other UI components here
        ],
      },
      {
        label: 'Prime Blocks',
        icon: 'pi pi-fw pi-clone',
        items: [
          {
            label: 'Free Blocks',
            routerLink: ['/free-blocks'],
          },
          {
            label: 'All Blocks',
            routerLink: ['/all-blocks'],
          },
        ],
      },
      {
        label: 'Utilities',
        icon: 'pi pi-fw pi-cog',
        routerLink: ['/utilities'],
      },
    ];
  }
}
