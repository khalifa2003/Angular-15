import { WishlistService } from 'src/app/services/wishlist.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent {
  // address = {
  //   fullName: '',
  //   streetAddress: '',
  //   city: '',
  //   state: '',
  //   postalCode: '',
  //   country: '',
  // };
  // savedAddresses = [
  //   {
  //     fullName: 'John Doe',
  //     streetAddress: '123 Main St',
  //     city: 'Anytown',
  //     state: 'Anystate',
  //     postalCode: '12345',
  //     country: 'Country A',
  //   },
  //   {
  //     fullName: 'Jane Smith',
  //     streetAddress: '456 Market St',
  //     city: 'Othertown',
  //     state: 'Otherstate',
  //     postalCode: '67890',
  //     country: 'Country B',
  //   },
  // ];
  // selectedAddress: any;
  wishList: any[] = [];
  constructor(private WishlistService: WishlistService) {}

  ngOnInit() {
    this.getWishlist();
  }

  getWishlist() {
    this.WishlistService.getWishlist().subscribe((res) => {
      this.wishList = res.data;
    });
  }

  wishlistItems = [
    { productName: 'Product 1', price: 100 },
    { productName: 'Product 2', price: 150 },
    { productName: 'Product 3', price: 200 },
  ];

  addToCart(item: any) {
    console.log('Added to cart:', item);
  }

  removeFromWishlist(item: any) {
    this.wishlistItems = this.wishlistItems.filter((i) => i !== item);
    console.log('Removed from wishlist:', item);
  }
}
