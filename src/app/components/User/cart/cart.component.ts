import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
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

  constructor(
    private cartService: CartService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.cartService.getCart().subscribe((res) => {
      this.cart = res.data;
      this.cart.cartItems.map((cart: any) => {
        this.products.push(cart.product);
      });
    });
  }

  addOne(item: any, quantity: number) {
    if (item.quantity < item.product.quantity) {
      this.cartService
        .updateCartItemQuantity(item._id, quantity + 1)
        .subscribe((res) => {
          this.getCart();
          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail: `Quantity Updated`,
          });
        });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'error',
        detail: `The quantity limit is ${item.product.quantity}`,
      });
    }
  }

  removeOne(id: string, quantity: number) {
    if (quantity > 1) {
      this.cartService
        .updateCartItemQuantity(id, quantity - 1)
        .subscribe((res) => {
          this.getCart();
          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail: `Quantity Updated`,
          });
        });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: `Invalid Quantity`,
      });
    }
  }

  deleteCart() {
    this.cartService.deleteCart().subscribe(() => {
      this.cart = {} as ICart;
      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: `Cart Deleted Successfully`,
      });
    });
  }

  deleteItem(itemId: string) {
    this.cartService.deleteCartItem(itemId).subscribe((res) => {
      this.getCart();
      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: `Product Deleted `,
      });
    });
  }
}
