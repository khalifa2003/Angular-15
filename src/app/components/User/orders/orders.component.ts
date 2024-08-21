import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  cartItems = [
    { productName: 'Product 1', price: 100, quantity: 2, total: 200 },
    { productName: 'Product 2', price: 150, quantity: 1, total: 150 },
  ];

  subtotal = this.cartItems.reduce((acc, item) => acc + item.total, 0);
  shipping = 120;
  total = this.subtotal + this.shipping;
}
