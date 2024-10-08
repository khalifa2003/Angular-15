import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {
  images: any[];

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

  constructor() {
    this.images = [
      '../../assets/swipper/swipper1.jpg',
      '../../assets/swipper/swipper2.jpg',
      '../../assets/swipper/swipper3.jpg',
      '../../assets/swipper/swipper4.jpg',
      '../../assets/swipper/swipper5.webp',
      '../../assets/swipper/swipper6.jpg',
      '../../assets/swipper/swipper8.avif',
    ];
  }
}
