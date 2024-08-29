import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminGuard } from 'src/app/Guards/admin.guard';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { BrandManagementComponent } from './brand-management/brand-management.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import { SubcategoryManagementComponent } from './subcategory-mangement/subcategory-management.component';
import { UsersManagementComponent } from './users-management/users-management.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent, canActivate: [AdminGuard] },
  {
    path: 'category/management',
    component: CategoryManagementComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'product/management',
    component: ProductManagementComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'brand/management',
    component: BrandManagementComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'subcategory/management',
    component: SubcategoryManagementComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'orders/management',
    component: OrderManagementComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'user/management',
    component: UsersManagementComponent,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
