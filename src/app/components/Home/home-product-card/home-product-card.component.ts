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
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-home-product-card',
  templateUrl: './home-product-card.component.html',
  styleUrls: ['./home-product-card.component.css'],
})
export class HomeProductCardComponent {
  @Output() notifyParent: EventEmitter<IProduct> = new EventEmitter();
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

  addToCart() {
    this.notifyParent.emit(this.product);
  }
}
