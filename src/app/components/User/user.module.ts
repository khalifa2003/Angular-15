import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { CartComponent } from './cart/cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [
    CheckOutComponent,
    ProfileComponent,
    CartComponent,
    WishlistComponent,
    OrdersComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    // ng prime
    InputTextModule,
    ButtonModule,
    DialogModule,
    RatingModule,
    SkeletonModule,
  ],
})
export class UserModule {}
