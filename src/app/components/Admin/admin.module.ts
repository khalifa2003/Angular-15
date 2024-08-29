import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BrandManagementComponent } from './brand-management/brand-management.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SubcategoryManagementComponent } from './subcategory-mangement/subcategory-management.component';
import { UsersManagementComponent } from './users-management/users-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PanelMenuModule } from 'primeng/panelmenu';
import { RatingModule } from 'primeng/rating';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  declarations: [
    SidebarComponent,
    AdminDashboardComponent,
    ProductManagementComponent,
    BrandManagementComponent,
    CategoryManagementComponent,
    SubcategoryManagementComponent,
    OrderManagementComponent,
    UsersManagementComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    // ng prime
    InputTextModule,
    SidebarModule,
    ButtonModule,
    ToolbarModule,
    TableModule,
    DialogModule,
    RatingModule,
    PanelMenuModule,
    DataViewModule,
  ],
})
export class AdminModule {}
