import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from './search-page/search-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { HomeComponent } from '../Home/home-page/home.component';
import { AboutUsComponent } from '../utils/about-us/about-us.component';
import { ContactComponent } from '../utils/contact/contact.component';

const routes: Routes = [
  { path: 'product', component: SearchPageComponent },
  { path: 'product/:id', component: ProductPageComponent },
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
