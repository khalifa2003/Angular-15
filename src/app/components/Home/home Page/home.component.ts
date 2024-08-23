import { AuthService } from 'src/app/services/auth.service';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { BrandService } from 'src/app/services/brand.service';
import { IBrand } from 'src/app/Models/ibrand';
import { ICategory } from 'src/app/Models/icategory';
import { IProduct } from 'src/app/Models/iproduct';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  responsiveOptions: any[];
  ids: { id: string; name: string; products: IProduct[] }[] = [
    { id: '665b9e7eee20a57f1c86a3df', name: 'NOTEBOOK', products: [] },
    { id: '665b9e66ee20a57f1c86a3dd', name: 'DESKTOP', products: [] },
    { id: '665b9e9cee20a57f1c86a3e1', name: 'STORAGE', products: [] },
    { id: '665b9ebaee20a57f1c86a3e3', name: 'MONITOR', products: [] },
    { id: '665b9ee3ee20a57f1c86a3e7', name: 'ACCESSORIES', products: [] },
  ];

  categories: ICategory[] = [];
  brands: IBrand[] = [];
  newArrival: IProduct[] = [];
  specialOffers: IProduct[] = [];
  product: IProduct = {} as IProduct;
  wishlist: any[] = [];

  constructor(
    private categoryService: CategoryService,
    private wishlistService: WishlistService,
    private productService: ProductService,
    private messageService: MessageService,
    private brandService: BrandService,
    private authService: AuthService,
    private cartService: CartService,
    private renderer: Renderer2,
    private router: Router,
    private el: ElementRef
  ) {
    this.responsiveOptions = [
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
  }

  ngOnInit() {
    this.getCategories();
    this.getProducts();
    this.getBrands();

    this.productService.getAllProducts().subscribe((res) => {
      this.newArrival = res.slice(-12);

      this.specialOffers = res.filter(
        (product: IProduct) => product.discount > 0
      );
    });

    this.getWishlist();
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  getBrands() {
    this.brandService.getAllBrands().subscribe((res) => {
      this.brands = res;
    });
  }

  async getProducts() {
    await this.ids.map((id) => {
      this.productService
        .searchProducts({ category: id.id })
        .subscribe((res) => {
          id.products = res;
        });
    });
    for (let i = 0; i < this.ids.length; i++) {}
  }

  getProductByCategory(item: ICategory) {
    this.router.navigate(['/product'], {
      queryParams: { category: item._id },
    });
  }

  getProductByBrand(item: IBrand) {
    this.router.navigate(['/product'], {
      queryParams: { brand: item._id },
    });
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
}
