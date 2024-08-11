import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  salesData = [
    { image: '../../../../assets/laptops2.png', name: 'Bamboo Watch', price: '$65.00' },
    { image: '../../../../assets/laptops2.png', name: 'Black Watch', price: '$72.00' },
    { image: '../../../../assets/laptops2.png', name: 'Blue Band', price: '$79.00' },
    { image: '../../../../assets/laptops2.png', name: 'Blue T-Shirt', price: '$29.00' },
    { image: '../../../../assets/laptops2.png', name: 'Bracelet', price: '$15.00' },
  ];

  bestSellingProducts = [
    { name: 'Space T-Shirt', category: 'Clothing', percentage: 50 },
    { name: 'Portal Sticker', category: 'Accessories', percentage: 16 },
    { name: 'Supernova Sticker', category: 'Accessories', percentage: 17 },
    { name: 'Wonders Notebook', category: 'Office', percentage: 25 },
    { name: 'Mat Black Case', category: 'Accessories', percentage: 75 },
    { name: 'Robots T-Shirt', category: 'Clothing', percentage: 40 },
  ];

  notifications = [
    { message: 'Richard Jones has purchased a blue t-shirt for $79' },
    { message: 'Your request for withdrawal of $2500 has been initiated' },
    { message: 'Keyser Wick has purchased a black jacket for $95' },
    { message: 'Jane Davis has posted a new question about your product.' },
  ];

  ngOnInit(): void {
    this.renderSalesOverviewChart();
  }

  renderSalesOverviewChart() {
    new Chart('salesOverviewChart', {
      type: 'line',
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
        ],
        datasets: [
          {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            borderColor: '#42A5F5',
            fill: false,
          },
          {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            borderColor: '#66BB6A',
            fill: false,
          },
        ],
      },
    });
  }
}
