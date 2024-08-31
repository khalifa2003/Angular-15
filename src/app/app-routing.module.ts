import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/Home/home Page/home.component';
import { NotFoundComponent } from './components/utils/not-found/not-found.component';
import { AuthGuard } from './Guards/auth.guard';
import { AdminGuard } from './Guards/admin.guard';
import { LoginGuard } from './Guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default path
    ],
  }, // Default path

  // Product
  {
    path: '',
    loadChildren: () =>
      import('./components/Product/product.module').then(
        (m) => m.ProductModule
      ),
  },

  // Auth
  {
    path: '',
    loadChildren: () =>
      import('./components/Auth/auth.module').then((m) => m.AuthModule),
    canActivate: [LoginGuard],
  },

  // User
  {
    path: 'user',
    loadChildren: () =>
      import('./components/User/user.module').then((m) => m.UserModule),
    canActivate: [AuthGuard],
  },

  // Admin
  {
    path: 'admin',
    loadChildren: () =>
      import('./components/Admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AdminGuard],
  },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
