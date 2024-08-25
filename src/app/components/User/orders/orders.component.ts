import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  orderDetails = [
    {
      orderNumber: 262387,
      orderDate: '2023-08-18',
      user: 'khalifa4112003@gmail.com',
      mobile: '01015388310',
      city: 'alexandria',
      address: 'الإسكندرية - العجمي - البيطاش - أخر شارع الوصيفي خلف مسجدكستي',
    },
  ];

  devices = [
    {
      id: 1,
      name: 'ONIKUMA CW902 Wired Gaming Mouse With Colorful',
      price: 125,
      quantity: 1,
      total: 125,
      totalPoint: 10,
    },
  ];

  paymentDetails = [
    { label: 'Total', value: '125 LE' },
    { label: 'Shipping Rate', value: '45 LE' },
    { label: 'Voucher', value: '0 LE' },
    { label: 'Payment method', value: 'Cash On Delivery' },
    { label: 'Payment type', value: 'Not Completed' },
    { label: 'Net', value: '170 LE' },
    { label: 'Total Point', value: '10' },
  ];

  statusDetails = [{ value: 'PENDING' }];
}
