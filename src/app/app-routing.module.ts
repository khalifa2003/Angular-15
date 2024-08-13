import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/Home/home Page/home.component';
import { NotFoundComponent } from './components/utils/not-found/not-found.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { RegisterComponent } from './components/Auth/register/register.component';
import { CategoryManagementComponent } from './components/Admin/category-management/category-management.component';
import { ProductManagementComponent } from './components/Admin/product-management/product-management.component';
import { BrandManagementComponent } from './components/Admin/brand-management/brand-management.component';
import { AdminDashboardComponent } from './components/Admin/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default path
    ],
  }, // Default path
  { path: 'home', component: HomeComponent },
  // { path: 'products', component: AllProductPageComponent },
  // { path: 'products/:id', component: ProductPageComponent },
  // { path: 'brands', component: BrandPageComponent },
  // { path: 'categories', component: CategoryPageComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'login/verify', component: ForgetPasswordComponent },

  // Admin
  {
    path: 'admin',
    component: AdminDashboardComponent,
  },
  {
    path: 'admin/category/management',
    component: CategoryManagementComponent,
  },
  {
    path: 'admin/product/management',
    component: ProductManagementComponent,
  },
  {
    path: 'admin/brand/management',
    component: BrandManagementComponent,
  },

  { path: '**', component: NotFoundComponent }, // wild card path
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
