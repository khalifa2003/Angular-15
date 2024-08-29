import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { HomeComponent } from '../Home/home Page/home.component';
import { HomeBrandCardComponent } from '../Home/home-brand-card/home-brand-card.component';
import { HomeCategoryCardComponent } from '../Home/home-category-card/home-category-card.component';
import { HomeProductCardComponent } from '../Home/home-product-card/home-product-card.component';
import { LandingComponent } from '../Home/landing/landing.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { SearchGridCardComponent } from './search-grid-card/search-grid-card.component';
import { SearchListCardComponent } from './search-list-card/search-list-card.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { GalleriaModule } from 'primeng/galleria';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RatingModule } from 'primeng/rating';
import { SidebarModule } from 'primeng/sidebar';
import { SliderModule } from 'primeng/slider';

@NgModule({
  declarations: [
    HomeComponent,
    HomeCategoryCardComponent,
    HomeProductCardComponent,
    HomeBrandCardComponent,
    LandingComponent,

    ProductPageComponent,
    SearchPageComponent,
    SearchGridCardComponent,
    SearchListCardComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    // ng prime
    MenubarModule,
    InputTextModule,
    ButtonModule,
    GalleriaModule,
    CarouselModule,
    SidebarModule,
    DialogModule,
    RatingModule,
    DataViewModule,
    AccordionModule,
    SliderModule,
    ProgressSpinnerModule,
  ],
})
export class ProductModule {}
