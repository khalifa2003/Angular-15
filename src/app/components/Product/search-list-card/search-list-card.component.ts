import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IProduct } from 'src/app/Models/iproduct';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-search-list-card',
  templateUrl: './search-list-card.component.html',
  styleUrls: ['./search-list-card.component.css'],
})
export class SearchListCardComponent {
  @Input() product: IProduct = {} as IProduct;
  wishlist: any[] = [];

  constructor(
    private wishlistService: WishlistService,
    private messageService: MessageService,
    private authService: AuthService,
    private cartService: CartService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.getWishlist();
  }

  addToWishlist(product: IProduct) {
    const audio = this.renderer.createElement('audio');
    this.renderer.setAttribute(audio, 'src', 'assets/audio/add.mp3');
    this.renderer.appendChild(this.el.nativeElement, audio);
    if (this.authService.isUserLogged) {
      this.wishlistService.addToWishlist(product._id).subscribe((res: any) => {
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

  RemoveFromWishlist(product: IProduct) {
    const audio = this.renderer.createElement('audio');
    this.renderer.setAttribute(audio, 'src', 'assets/audio/remove.mp3');
    this.renderer.appendChild(this.el.nativeElement, audio);
    if (this.authService.isUserLogged) {
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

  getWishlist() {
    if (this.authService.isUserLogged) {
      this.wishlistService.getWishlist().subscribe((res) => {
        this.wishlist = res.data.map((product: { _id: any }) => {
          return product._id;
        });
      });
    }
  }

  isInWishlist(id: string): boolean {
    return this.wishlist.includes(id);
  }

  addToCart(selectedProduct: IProduct) {
    if (this.authService.isUserLogged) {
      const audio = this.renderer.createElement('audio');
      this.renderer.setAttribute(audio, 'src', 'assets/audio/add.mp3');
      this.renderer.appendChild(this.el.nativeElement, audio);
      if (this.authService.isUserLogged) {
        this.cartService.addToCart(selectedProduct._id).subscribe((res) => {
          this.product = selectedProduct;
          this.showModal = true;
          setTimeout(() => {
            this.showModal = false;
          }, 7000);
          audio.play();
        });
      }
    }
  }

  showModal: boolean = false;
  closeModal() {
    this.showModal = false;
  }
}
