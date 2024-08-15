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
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
