import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { IBrand } from 'src/app/Models/ibrand';
import { ICategory } from 'src/app/Models/icategory';
import { IProduct } from 'src/app/Models/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { MessageService } from 'primeng/api';
import { WishlistService } from 'src/app/services/wishlist.service';
import { AudioService } from 'src/app/services/audio.service';
import { BrandService } from 'src/app/services/brand.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  responsiveOptions = [
    {
      breakpoint: '1599px',
      numVisible: 6,
      numScroll: 2,
    },
    {
      breakpoint: '1199px',
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
  listOfProductsByCategory: { name: string; products: IProduct[] }[] = [];

  categories: ICategory[] = [];
  brands: IBrand[] = [];
  newArrival: IProduct[] = [];
  specialOffers: IProduct[] = [];
  product: IProduct = {} as IProduct;
  showModal: boolean = false;
  wishlist: string[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private authService: AuthService,
    private brandService: BrandService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private audioService: AudioService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getData();
    this.getProducts();
    this.getWishlist();
  }
  getData() {
    this.brandService.getAllBrands().subscribe((res) => {
      this.brands = res;
    });
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categories = res;
    });
    this.productService.getAllProducts().subscribe((res) => {
      this.newArrival = res.slice(-12);
      this.specialOffers = res.filter(
        (product: IProduct) => product.discount > 0
      );
    });
  }

  getProducts() {
    this.productService.getHomeProducts().subscribe((res) => {
      this.listOfProductsByCategory = res;
    });
  }

  getWishlist() {
    if (this.authService.isAuthenticated()) {
      this.wishlistService.getWishlistProductsIds().subscribe((res) => {
        this.wishlist = res;
      });
    }
  }

  closeModal() {
    this.showModal = false;
  }

  addToCart(selectedProduct: IProduct) {
    if (this.authService.isAuthenticated()) {
      this.audioService.playAudio('addToWishlist');
      this.product = selectedProduct;
      this.cartService.addToCart(selectedProduct._id).subscribe((res) => {
        this.showModal = true;
        setTimeout(() => {
          this.showModal = false;
        }, 7000);
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'You must login first before adding to cart.',
      });
    }
  }
}
