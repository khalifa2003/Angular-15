import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { IProduct } from 'src/app/Models/iproduct';
import { IReview } from 'src/app/Models/ireview';
import { IUser } from 'src/app/Models/iuser';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { ReviewService } from 'src/app/services/review.service';
import { UserService } from '../../../services/user.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent {
  product: IProduct = {} as IProduct;
  wishlist: any[] = [];
  constructor(
    private wishlistService: WishlistService,
    private productService: ProductService,
    private messageService: MessageService,
    private reviewService: ReviewService,
    private userService: UserService,
    private cartService: CartService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private fb: FormBuilder,
    private el: ElementRef
  ) {
    this.reviewForm = this.fb.group({
      score: [0, Validators.required],
      title: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getWishlist();
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          return this.productService.getProductById(params.get('id'));
        })
      )
      .subscribe((res) => {
        this.product = res;
        this.getReviews();
      });
  }

  addToWishlist() {
    const audio = this.renderer.createElement('audio');
    this.renderer.setAttribute(audio, 'src', 'assets/audio/add.mp3');
    this.renderer.appendChild(this.el.nativeElement, audio);
    if (this.authService.isAuthenticated()) {
      this.wishlistService
        .addToWishlist(this.product._id)
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

  RemoveFromWishlist() {
    const audio = this.renderer.createElement('audio');
    this.renderer.setAttribute(audio, 'src', 'assets/audio/remove.mp3');
    this.renderer.appendChild(this.el.nativeElement, audio);
    if (this.authService.isAuthenticated()) {
      this.wishlistService
        .removeFromWishlist(this.product._id)
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
    if (this.authService.isAuthenticated()) {
      this.wishlistService.getWishlist().subscribe((res) => {
        this.wishlist = res.data.map((product: { _id: any }) => {
          return product._id;
        });
      });
    }
  }

  isInWishlist(): boolean {
    return this.wishlist.includes(this.product._id);
  }

  addToCart() {
    if (this.authService.isAuthenticated()) {
      const audio = this.renderer.createElement('audio');
      this.renderer.setAttribute(audio, 'src', 'assets/audio/add.mp3');
      this.renderer.appendChild(this.el.nativeElement, audio);
      if (this.authService.isAuthenticated()) {
        this.cartService.addToCart(this.product._id).subscribe((res) => {
          this.product = this.product;
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
  reviewsList: IReview[] = [];
  user: IUser = {} as IUser;
  reviewForm: FormGroup;

  addReview() {
    if (this.authService.isAuthenticated()) {
      this.reviewService
        .addReview(
          this.reviewForm.value.title,
          this.reviewForm.value.score,
          this.product._id
        )
        .subscribe((res) => {
          this.reviewForm.reset();
          this.getReviews();
        });
    } else {
      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: 'You Are not Logged In',
      });
    }
  }

  getReviews() {
    this.reviewService.getReviews(this.product._id).subscribe((res) => {
      this.reviewsList = res;
    });
    this.userService.getMe().subscribe((res) => {
      this.user = res;
    });
  }

  deleteReview(id: string) {
    this.reviewService.deleteReview(id).subscribe((res) => {
      this.getReviews();
    });
  }

  // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  get activeIndex(): number {
    return this._activeIndex;
  }
  set activeIndex(newValue) {
    if (
      this.product.images &&
      0 <= newValue &&
      newValue <= this.product.images.length - 1
    ) {
      this._activeIndex = newValue;
    }
  }
  _activeIndex: number = 2;
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  next() {
    this.activeIndex++;
  }
  prev() {
    this.activeIndex--;
  }
}
