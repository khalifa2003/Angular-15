import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IProduct } from 'src/app/Models/iproduct';
import { AudioService } from 'src/app/services/audio.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-search-grid-card',
  templateUrl: './search-grid-card.component.html',
  styleUrls: ['./search-grid-card.component.css'],
})
export class SearchGridCardComponent {
  @Input() product: IProduct = {} as IProduct;
  @Input() wishlist: string[] = [];
  showModal: boolean = false;

  constructor(
    private wishlistService: WishlistService,
    private messageService: MessageService,
    private authService: AuthService,
    private cartService: CartService,
    private audioService: AudioService
  ) {}

  addToWishlist(product: IProduct) {
    if (this.authService.isAuthenticated()) {
      this.wishlistService.addToWishlist(product._id).subscribe((res) => {
        this.audioService.playAudio('add');
        this.wishlist = res.map((product) => {
          return product._id;
        });
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Product added to wishlist',
        });
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'You must login first before adding to wishlist.',
      });
    }
  }

  RemoveFromWishlist(product: IProduct) {
    if (this.authService.isAuthenticated()) {
      this.wishlistService.removeFromWishlist(product._id).subscribe((res) => {
        this.audioService.playAudio('remove');
        this.wishlist = res.map((product: IProduct) => {
          return product._id;
        });
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Product removed from wishlist',
        });
      });
    }
  }

  isInWishlist(id: string): boolean {
    return this.wishlist.includes(id);
  }

  addToCart(selectedProduct: IProduct) {
    if (this.authService.isAuthenticated()) {
      this.cartService.addToCart(selectedProduct._id).subscribe((res) => {
        this.product = selectedProduct;
        this.showModal = true;
        setTimeout(() => {
          this.showModal = false;
        }, 7000);
        this.audioService.playAudio('add');
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'You must login first before adding to wishlist.',
      });
    }
  }
}
