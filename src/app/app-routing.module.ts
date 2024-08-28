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
import { SubcategoryMangementComponent } from './components/Admin/subcategory-mangement/subcategory-mangement.component';
import { ProductPageComponent } from './components/Product/product-page/product-page.component';
import { SearchPageComponent } from './components/Product/search-page/search-page.component';
import { AdminGuard } from './Guards/admin.guard';
import { AboutUsComponent } from './components/utils/about-us/about-us.component';
import { ContactComponent } from './components/utils/contact/contact.component';
import { ProfileComponent } from './components/User/profile/profile.component';
import { CartComponent } from './components/User/cart/cart.component';
import { WishlistComponent } from './components/User/wishlist/wishlist.component';
import { OrdersComponent } from './components/User/orders/orders.component';
import { CheckOutComponent } from './components/User/check-out/check-out.component';
import { OrderManagementComponent } from './components/Admin/order-management/order-management.component';
import { UsersManagementComponent } from './components/Admin/users-management/users-management.component';
import { ForgetPasswordComponent } from './components/Auth/forget-password/forget-password.component';
import { VerifyResetCodeComponent } from './components/Auth/verify-reset-code/verify-reset-code.component';
import { ResetPasswordComponent } from './components/Auth/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default path
    ],
  }, // Default path
  { path: 'home', component: HomeComponent },
  { path: 'product', component: SearchPageComponent },
  { path: 'product/:id', component: ProductPageComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },

  // Auth
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login/forgot-password', component: ForgetPasswordComponent },
  { path: 'login/verify', component: VerifyResetCodeComponent },
  { path: 'login/reset-password', component: ResetPasswordComponent },

  // User
  { path: 'profile', component: ProfileComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckOutComponent },

  // Admin
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/category/management',
    component: CategoryManagementComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/product/management',
    component: ProductManagementComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/brand/management',
    component: BrandManagementComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/subcategory/management',
    component: SubcategoryMangementComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/orders/management',
    component: OrderManagementComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/user/management',
    component: UsersManagementComponent,
    canActivate: [AdminGuard],
  },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
