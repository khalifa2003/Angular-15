import { WishlistService } from 'src/app/services/wishlist.service';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { IProduct } from 'src/app/Models/iproduct';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent {
  products: IProduct[] = [];
  product: IProduct = {} as IProduct;

  ngOnInit(): void {
    this.getWishlist();
  }

  wishlist: any[] = [];

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
          this.products = res.data;
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
        this.products = res.data;
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
