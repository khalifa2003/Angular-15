import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { BrandManagementComponent } from './brand-management/brand-management.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import { SubcategoryManagementComponent } from './subcategory-mangement/subcategory-management.component';
import { UsersManagementComponent } from './users-management/users-management.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  {
    path: 'category/management',
    component: CategoryManagementComponent,
  },
  {
    path: 'product/management',
    component: ProductManagementComponent,
  },
  {
    path: 'brand/management',
    component: BrandManagementComponent,
  },
  {
    path: 'subcategory/management',
    component: SubcategoryManagementComponent,
  },
  {
    path: 'orders/management',
    component: OrderManagementComponent,
  },
  {
    path: 'user/management',
    component: UsersManagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
