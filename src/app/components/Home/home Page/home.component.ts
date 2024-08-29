import { AuthService } from 'src/app/services/auth.service';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { BrandService } from 'src/app/services/brand.service';
import { IBrand } from 'src/app/Models/ibrand';
import { ICategory } from 'src/app/Models/icategory';
import { IProduct } from 'src/app/Models/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { MessageService } from 'primeng/api';
import { combineLatest, forkJoin, map, mergeMap, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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
  showModal: boolean = false;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private cartService: CartService,
    private renderer: Renderer2,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.categories = data['categories'];
      this.brands = data['brands'];
      const products = data['products'];
      this.newArrival = products.slice(-12);
      this.specialOffers = products.filter(
        (product: IProduct) => product.discount > 0
      );
      this.getProducts();
    });
  }

  getProducts() {
    this.ids.forEach((id) => {
      this.productService
        .searchProducts({ category: id.id })
        .subscribe((res) => {
          id.products = res;
        });
    });
  }

  closeModal() {
    this.showModal = false;
  }

  addToCart(selectedProduct: IProduct) {
    if (this.authService.isAuthenticated()) {
      const audio = this.renderer.createElement('audio');
      this.renderer.setAttribute(audio, 'src', 'assets/audio/add.mp3');
      this.renderer.appendChild(this.el.nativeElement, audio);

      audio.play();
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
