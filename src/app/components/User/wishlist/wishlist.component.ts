import { WishlistService } from 'src/app/services/wishlist.service';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { IProduct } from 'src/app/Models/iproduct';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent {
  products: IProduct[] = [];
  showModal: boolean = false;
  product: IProduct = {} as IProduct;
  wishlist: any[] = [];
  loading: boolean = false;
  error: string | null = null;

  ngOnInit(): void {
    this.getWishlist();
  }

  constructor(
    private wishlistService: WishlistService,
    private messageService: MessageService,
    private authService: AuthService,
    private cartService: CartService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  addToWishlist(product: IProduct): void {
    const audio = this.renderer.createElement('audio');
    this.renderer.setAttribute(audio, 'src', 'assets/audio/add.mp3');
    this.renderer.appendChild(this.el.nativeElement, audio);

    if (this.authService.isAuthenticated()) {
      this.wishlistService
        .addToWishlist(product._id)
        .pipe(
          tap((res: any) => {
            audio.play();
            this.wishlist = res.data.map(
              (product: { _id: string }) => product._id
            );
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: res.message,
            });
          })
        )
        .subscribe();
    }
  }

  removeFromWishlist(product: IProduct): void {
    const audio = this.renderer.createElement('audio');
    this.renderer.setAttribute(audio, 'src', 'assets/audio/remove.mp3');
    this.renderer.appendChild(this.el.nativeElement, audio);

    if (this.authService.isAuthenticated()) {
      this.wishlistService
        .removeFromWishlist(product._id)
        .pipe(
          tap((res: any) => {
            audio.play();
            this.products = res.data;
            this.wishlist = res.data.map(
              (product: { _id: string }) => product._id
            );
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: res.message,
            });
          })
        )
        .subscribe();
    }
  }

  getWishlist(): void {
    if (this.authService.isAuthenticated()) {
      this.loading = true;
      this.wishlistService
        .getWishlist()
        .pipe(
          tap((res) => {
            this.products = res.data;
            this.wishlist = res.data.map(
              (product: { _id: string }) => product._id
            );
          }),
          tap(() => (this.loading = false))
        )
        .subscribe();
    }
  }

  isInWishlist(id: string): boolean {
    return this.wishlist.includes(id);
  }

  addToCart(selectedProduct: IProduct): void {
    const audio = this.renderer.createElement('audio');
    this.renderer.setAttribute(audio, 'src', 'assets/audio/add.mp3');
    this.renderer.appendChild(this.el.nativeElement, audio);

    this.cartService
      .addToCart(selectedProduct._id)
      .pipe(
        tap(() => {
          this.product = selectedProduct;
          this.showModal = true;
          setTimeout(() => {
            this.showModal = false;
          }, 7000);
          audio.play();
        })
      )
      .subscribe();
  }

  closeModal() {
    this.showModal = false;
  }
}
