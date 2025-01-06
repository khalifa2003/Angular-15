import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable, of, shareReplay, switchMap } from 'rxjs';
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
  wishlist: string[] = [];
  reviewsList: IReview[] = [];
  user: IUser = {} as IUser;
  reviewForm: FormGroup;
  showModal: boolean = false;
  _activeIndex: number = 2;
  responsiveOptions: {
    breakpoint: string;
    numVisible: number;
  }[] = [
    { breakpoint: '1024px', numVisible: 5 },
    { breakpoint: '768px', numVisible: 3 },
    { breakpoint: '560px', numVisible: 1 },
  ];
  data$!: Observable<any>;
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

    this.data$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const productId = params.get('id') || '';
        return forkJoin({
          product: this.productService.getProductById(productId),
          reviews: this.reviewService.getReviews(productId),
          user: this.authService.isAuthenticated()
            ? this.userService.getMe()
            : of(null),
        }).pipe(shareReplay(1));
      })
    );

    this.data$.subscribe((res) => {
      this.product = res.product;
      this.reviewsList = res.reviews;
      this.user = res.user;
    });
  }

  addToWishlist() {
    const audio = this.renderer.createElement('audio');
    this.renderer.setAttribute(audio, 'src', 'assets/audio/add.mp3');
    this.renderer.appendChild(this.el.nativeElement, audio);

    if (this.authService.isAuthenticated()) {
      this.wishlist.push(this.product._id);
      this.messageService.add({
        severity: 'info',
        summary: 'Adding to Wishlist',
        detail: 'Please wait...',
      });

      this.wishlistService.addToWishlist(this.product._id).subscribe({
        next: (res) => {
          audio.play();
          this.wishlist = res.data.map(
            (product: { _id: string }) => product._id
          );
          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail: 'Product added to wishlist',
          });
        },
        error: () => {
          this.wishlist = this.wishlist.filter((id) => id !== this.product._id);
          this.messageService.add({
            severity: 'error',
            summary: 'Failed',
            detail: 'Could not add to wishlist. Please try again.',
          });
        },
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'You must login first before adding to wishlist.',
      });
    }
  }

  RemoveFromWishlist() {
    const audio = this.renderer.createElement('audio');
    this.renderer.setAttribute(audio, 'src', 'assets/audio/remove.mp3');
    this.renderer.appendChild(this.el.nativeElement, audio);

    if (this.authService.isAuthenticated()) {
      this.wishlist = this.wishlist.filter((id) => id !== this.product._id);
      audio.play();
      this.messageService.add({
        severity: 'info',
        summary: 'Removing from Wishlist',
        detail: 'Please wait...',
      });

      this.wishlistService
        .removeFromWishlist(this.product._id)
        .subscribe((res) => {
          this.wishlist = res.data.map((product: IProduct) => product._id);
          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail:'Product removed from wishlist',
          });
        });
    }
  }

  getWishlist() {
    if (this.authService.isAuthenticated()) {
      this.wishlistService.getWishlist().subscribe((res) => {
        this.wishlist = res.data.map((product: IProduct) => {
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
      // Play the audio immediately to provide instant feedback
      const audio = this.renderer.createElement('audio');
      this.renderer.setAttribute(audio, 'src', 'assets/audio/add.mp3');
      this.renderer.appendChild(this.el.nativeElement, audio);
      audio.play();

      // Optimistically show the modal
      this.showModal = true;
      setTimeout(() => {
        this.showModal = false;
      }, 7000);

      // Trigger the API call
      this.cartService.addToCart(this.product._id).subscribe({
        next: (res) => {
          // Update the product or cart state if needed
          this.product = this.product; // Assuming this line might have been intended to do something specific
          // Show success feedback if needed (e.g., update UI state, show a success message)
          this.messageService.add({
            severity: 'success',
            summary: 'Added to Cart',
            detail: 'The product has been added to your cart successfully.',
          });
        },
        error: () => {
          // Revert the modal and show error feedback if the request fails
          this.showModal = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Failed',
            detail: 'Could not add the product to the cart. Please try again.',
          });
        },
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'You must login first before adding to cart.',
      });
    }
  }

  closeModal() {
    this.showModal = false;
  }

  addReview() {
    if (this.authService.isAuthenticated()) {
      // Optimistically update the UI
      const newReview: IReview = {
        _id: 'temp-id', // Temporary ID to identify the review until it comes back from the server
        title: this.reviewForm.value.title,
        ratings: this.reviewForm.value.score,
        product: this.product._id,
        user: this.user,
      };

      // Add the new review optimistically to the reviews list
      this.reviewsList.push(newReview);

      this.messageService.add({
        severity: 'info',
        summary: 'Adding Review',
        detail: 'Please wait...',
      });

      this.reviewService
        .addReview(newReview.title, newReview.ratings, newReview.product)
        .subscribe({
          next: (res) => {
            this.getReviews();
            this.messageService.add({
              severity: 'success',
              summary: 'Review Added',
              detail: 'Your review has been added successfully.',
            });
          },
          error: () => {
            this.getReviews();
            this.messageService.add({
              severity: 'error',
              summary: 'Failed',
              detail: 'Could not add the review. Please try again.',
            });
          },
          complete: () => {
            // Reset the review form after successful submission or failure
            this.reviewForm.reset();
          },
        });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Authentication Required',
        detail: 'You need to be logged in to add a review.',
      });
    }
  }

  getReviews() {
    this.reviewService.getReviews(this.product._id).subscribe((res) => {
      this.reviewsList = res;
    });
    if (this.authService.isAuthenticated()) {
      this.userService.getMe().subscribe((res) => {
        this.user = res;
      });
    }
  }

  deleteReview(id: string) {
    this.reviewService.deleteReview(id).subscribe((res) => {
      this.getReviews();
      this.messageService.add({
        severity: 'success',
        summary: 'Review Deleted',
        detail: 'Your review has been deleted successfully.',
      });
    });
  }

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

  next() {
    this.activeIndex++;
  }
  prev() {
    this.activeIndex--;
  }
}
