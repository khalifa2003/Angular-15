import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

// Primng
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { PasswordModule } from 'primeng/password';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { MessageService } from 'primeng/api';
import { DataViewModule } from 'primeng/dataview';
import { CheckboxModule } from 'primeng/checkbox';
import { AccordionModule } from 'primeng/accordion';
import { SliderModule } from 'primeng/slider';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MenuModule } from 'primeng/menu';
import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SkeletonModule } from 'primeng/skeleton';
import { PanelModule } from 'primeng/panel';
import { ListboxModule } from 'primeng/listbox';
import { DividerModule } from 'primeng/divider';
import { BreadcrumbModule } from 'primeng/breadcrumb';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/Home/landing/landing.component';
import { NavbarComponent } from './components/utils/navbar/navbar.component';
import { HomeComponent } from './components/Home/home Page/home.component';
import { FooterComponent } from './components/utils/footer/footer.component';
import { NotFoundComponent } from './components/utils/not-found/not-found.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { RegisterComponent } from './components/Auth/register/register.component';
import { SidebarComponent } from './components/Admin/sidebar/sidebar.component';
import { ProductManagementComponent } from './components/Admin/product-management/product-management.component';
import { BrandManagementComponent } from './components/Admin/brand-management/brand-management.component';
import { CategoryManagementComponent } from './components/Admin/category-management/category-management.component';
import { AdminDashboardComponent } from './components/Admin/admin-dashboard/admin-dashboard.component';
import { SubcategoryMangementComponent } from './components/Admin/subcategory-mangement/subcategory-mangement.component';
import { ProductPageComponent } from './components/Product/product-page/product-page.component';
import { SearchPageComponent } from './components/Product/search-page/search-page.component';
import { AboutUsComponent } from './components/utils/about-us/about-us.component';
import { ContactComponent } from './components/utils/contact/contact.component';
import { ProfileComponent } from './components/User/profile/profile.component';
import { AddressComponent } from './components/User/address/address.component';
import { CartComponent } from './components/User/cart/cart.component';
import { WishlistComponent } from './components/User/wishlist/wishlist.component';
import { OrdersComponent } from './components/User/orders/orders.component';
import { SearchGridCardComponent } from './components/Product/search-grid-card/search-grid-card.component';
import { SearchListCardComponent } from './components/Product/search-list-card/search-list-card.component';
import { HomeCategoryCardComponent } from './components/Home/home-category-card/home-category-card.component';
import { HomeProductCardComponent } from './components/Home/home-product-card/home-product-card.component';
import { HomeBrandCardComponent } from './components/Home/home-brand-card/home-brand-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    LandingComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    SidebarComponent,
    ProductManagementComponent,
    BrandManagementComponent,
    CategoryManagementComponent,
    AdminDashboardComponent,
    SubcategoryMangementComponent,
    ProductPageComponent,
    SearchPageComponent,
    AboutUsComponent,
    ContactComponent,
    ProfileComponent,
    AddressComponent,
    CartComponent,
    WishlistComponent,
    OrdersComponent,
    SearchGridCardComponent,
    SearchListCardComponent,
    HomeCategoryCardComponent,
    HomeProductCardComponent,
    HomeBrandCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    // ng prime
    MenubarModule,
    InputTextModule,
    ButtonModule,
    GalleriaModule,
    CardModule,
    CarouselModule,
    PasswordModule,
    SidebarModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    DropdownModule,
    RatingModule,
    PanelMenuModule,
    DataViewModule,
    CheckboxModule,
    AccordionModule,
    SliderModule,
    RadioButtonModule,
    MenuModule,
    TagModule,
    ProgressSpinnerModule,
    SkeletonModule,
    PanelModule,
    ListboxModule,
    DividerModule,
    BreadcrumbModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
