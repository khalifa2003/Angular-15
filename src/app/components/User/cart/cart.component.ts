import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, of, tap } from 'rxjs';
import { ICart } from 'src/app/Models/icart';
import { IProduct } from 'src/app/Models/iproduct';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  products: IProduct[] = [];
  cart: ICart = {} as ICart;
  loading: boolean = false;

  constructor(
    private cartService: CartService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    this.loading = true;
    this.cartService
      .getCart()
      .pipe(
        tap((res) => {
          this.cart = res.data;
          this.products = this.cart.cartItems.map(
            (cartItem) => cartItem.product
          );
        }),
        catchError((err) => {
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'err.error.status',
            detail: err.error.message,
          });
          return of(err);
        })
      )
      .subscribe();
  }

  addOne(item: any, quantity: number): void {
    if (item.quantity < item.product.quantity) {
      this.cartService
        .updateCartItemQuantity(item._id, quantity + 1)
        .pipe(
          tap(() => {
            this.getCart(); // Refresh cart after update
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Quantity Updated',
            });
          }),
          catchError((error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update quantity. Please try again.',
            });
            return of(null);
          })
        )
        .subscribe();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: `The quantity limit is ${item.product.quantity}`,
      });
    }
  }

  removeOne(id: string, quantity: number): void {
    if (quantity > 1) {
      this.cartService
        .updateCartItemQuantity(id, quantity - 1)
        .pipe(
          tap(() => {
            this.getCart(); // Refresh cart after update
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Quantity Updated',
            });
          }),
          catchError((error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update quantity. Please try again.',
            });
            return of(null);
          })
        )
        .subscribe();
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Invalid Quantity',
      });
    }
  }

  deleteCart(): void {
    this.cartService
      .deleteCart()
      .pipe(
        tap(() => {
          this.cart = {} as ICart;
          this.products = []; // Clear products on cart deletion
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Cart Deleted Successfully',
          });
        }),
        catchError((error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete cart. Please try again.',
          });
          return of(null);
        })
      )
      .subscribe();
  }

  deleteItem(itemId: string): void {
    this.cartService
      .deleteCartItem(itemId)
      .pipe(
        tap(() => {
          this.getCart(); // Refresh cart after item deletion
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product Deleted',
          });
        }),
        catchError((error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete item. Please try again.',
          });
          return of(null);
        })
      )
      .subscribe();
  }
}
