import { Component } from '@angular/core';
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

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent {
  product: IProduct = {} as IProduct;
  constructor(
    private productService: ProductService,
    private userService: UserService,
    private reviewService: ReviewService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.reviewForm = this.fb.group({
      score: [0, Validators.required],
      title: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          return this.productService.getProductById(params.get('id'));
        })
      )
      .subscribe((res) => {
        this.product = res;
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
  // ----------------------------------
  fullStars: number[] = [];
  halfStar: boolean = false;
  emptyStars: number[] = [];

  ngOnChanges(): void {
    this.updateStars();
    this.getReviews();
  }

  private updateStars(): void {
    const fullStarsCount = Math.floor(this.product.ratingsAverage);
    const hasHalfStar = this.product.ratingsAverage % 1 !== 0;
    const emptyStarsCount = 5 - fullStarsCount - (hasHalfStar ? 1 : 0);

    this.fullStars = Array(fullStarsCount).fill(0);
    this.halfStar = hasHalfStar;
    this.emptyStars = Array(emptyStarsCount).fill(0);
  }
  addToCart() {
    this.cartService.addToCart(this.product._id).subscribe((res) => {});
  }
  // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  reviewsList: IReview[] = [];
  user: IUser = {} as IUser;
  reviewForm: FormGroup;

  addReview() {
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
}
