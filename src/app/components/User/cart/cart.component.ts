import { Component } from '@angular/core';
import { ICart } from 'src/app/Models/icart';
import { IProduct } from 'src/app/Models/iproduct';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

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
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getCart();
  }
  getCart() {
    this.cartService.getCart().subscribe((res) => {
      this.products = [];
      this.cart = res.data;
      this.cart.cartItems.map((id: any) => {
        this.productService.getProductById(id.product).subscribe((res) => {
          this.cart.cartItems.map((el: any, index: number) => {
            if (el.product == res.data._id) {
              this.cart.cartItems[index].product = res.data;
            }
          });
        });
      });
    });
  }
  addOne(id: string, quantity: number) {
    this.cartService
      .updateCartItemQuantity(id, quantity + 1)
      .subscribe((res) => {
        this.getCart();
      });
  }
  removeOne(id: string, quantity: number) {
    if (quantity == 1) {
      return;
    }
    this.cartService
      .updateCartItemQuantity(id, quantity - 1)
      .subscribe((res) => {
        this.getCart();
      });
  }
  deleteCart() {
    this.cartService.deleteCart().subscribe(() => {
      this.cart = {} as ICart;
    });
  }

  showModal: boolean = false;
  selectedItem: string = '';
  openModel(id: string) {
    this.showModal = true;
    this.selectedItem = id;
  }
  closeModal() {
    this.showModal = false;
  }
  deleteItem() {
    this.cartService.deleteCartItem(this.selectedItem).subscribe((res) => {
      this.getCart();
      this.closeModal();
    });
  }
}
