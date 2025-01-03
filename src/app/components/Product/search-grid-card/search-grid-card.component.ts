import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError } from 'rxjs';
import { IProduct } from 'src/app/Models/iproduct';
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

  constructor(
    private wishlistService: WishlistService,
    private messageService: MessageService,
    private authService: AuthService,
    private cartService: CartService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  addToWishlist(product: IProduct) {
    const audio = this.renderer.createElement('audio');
    this.renderer.setAttribute(audio, 'src', 'assets/audio/add.mp3');
    this.renderer.appendChild(this.el.nativeElement, audio);

    if (this.authService.isAuthenticated()) {
      this.wishlistService.addToWishlist(product._id).subscribe((res: any) => {
        audio.play();

        this.wishlist = res.data.map((product: { _id: string }) => {
          return product._id;
        });
        this.messageService.add({
          severity: res.status,
          summary: 'success',
          detail: res.message,
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
    const audio = this.renderer.createElement('audio');
    this.renderer.setAttribute(audio, 'src', 'assets/audio/remove.mp3');
    this.renderer.appendChild(this.el.nativeElement, audio);
    if (this.authService.isAuthenticated()) {
      this.wishlistService
        .removeFromWishlist(product._id)
        .subscribe((res: any) => {
          audio.play();
          this.wishlist = res.data.map((product: { _id: any }) => {
            return product._id;
          });
          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail: res.message,
          });
        });
    }
  }

  isInWishlist(id: string): boolean {
    return this.wishlist.includes(id);
  }

  addToCart(selectedProduct: IProduct) {
    if (this.authService.isAuthenticated()) {
      const audio = this.renderer.createElement('audio');
      this.renderer.setAttribute(audio, 'src', 'assets/audio/add.mp3');
      this.renderer.appendChild(this.el.nativeElement, audio);
      this.cartService.addToCart(selectedProduct._id).subscribe((res) => {
        this.product = selectedProduct;
        this.showModal = true;
        setTimeout(() => {
          this.showModal = false;
        }, 7000);
        audio.play();
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'You must login first before adding to wishlist.',
      });
    }
  }

  showModal: boolean = false;
  closeModal() {
    this.showModal = false;
  }
}
