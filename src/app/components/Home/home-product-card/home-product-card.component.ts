import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { MessageService } from 'primeng/api';
import { IProduct } from 'src/app/Models/iproduct';
import { AudioService } from 'src/app/services/audio.service';
import { AuthService } from 'src/app/services/auth.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-home-product-card',
  templateUrl: './home-product-card.component.html',
  styleUrls: ['./home-product-card.component.css'],
})
export class HomeProductCardComponent {
  @Output() notifyParent: EventEmitter<IProduct> = new EventEmitter();
  @Input() product: IProduct = {} as IProduct;
  @Input() wishlist: string[] = [];

  constructor(
    private wishlistService: WishlistService,
    private messageService: MessageService,
    private audioService: AudioService,
    private authService: AuthService
  ) {}

  addToWishlist(product: IProduct) {
    if (this.authService.isAuthenticated()) {
      this.wishlistService.addToWishlist(product._id).subscribe((res) => {
        this.audioService.playAudio('addToWishlist');
        this.wishlist = res.map((product) => product._id);
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
        this.audioService.playAudio('removeFromWishlist');
        this.wishlist = res.map((product) => product._id);
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

  addToCart() {
    this.notifyParent.emit(this.product);
  }
}
