import { Component } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent {
  addresses = ['01015388310 - Alexandria - شارع العوضي'];
  selectedAddress = this.addresses[0];
  newAddress = { mobile: '', city: '', address: '' };
  paymentMethod = 'cod';
  couponCode = '';
  shippingCost = 51;
  voucherDiscount = 0;

  cartItems = [
    {
      image: 'path/to/image1.jpg',
      name: 'Rahala RAL2209 laptop backpack 15.6-Inch With USB Charging Black',
      quantity: 1,
      unitPrice: 1225,
      points: 10,
      total: 1225,
    },
  ];

  get subTotal() {
    return this.cartItems.reduce((sum, item) => sum + item.total, 0);
  }

  get total() {
    return this.subTotal + this.shippingCost - this.voucherDiscount;
  }

  get totalPoints() {
    return this.cartItems.reduce((sum, item) => sum + item.points, 0);
  }

  addNewAddress() {
    const newAddr = `${this.newAddress.mobile} - ${this.newAddress.city} - ${this.newAddress.address}`;
    this.addresses.push(newAddr);
    this.selectedAddress = newAddr;
    this.newAddress = { mobile: '', city: '', address: '' };
  }

  applyCoupon() {
    // Logic for applying coupon
  }
}
