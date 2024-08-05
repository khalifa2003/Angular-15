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
      {
        itemImageSrc: '../../assets/swipper/swipper1.jpg',
        thumbnailImageSrc: '../../assets/swipper/swipper1.jpg',
      },
      {
        itemImageSrc: '../../assets/swipper/swipper2.jpg',
        thumbnailImageSrc: '../../assets/swipper/swipper2.jpg',
      },
      {
        itemImageSrc: '../../assets/swipper/swipper3.jpg',
        thumbnailImageSrc: '../../assets/swipper/swipper3.jpg',
      },
      {
        itemImageSrc: '../../assets/swipper/swipper4.jpg',
        thumbnailImageSrc: '../../assets/swipper/swipper4.jpg',
      },
      {
        itemImageSrc: '../../assets/swipper/swipper5.jpg',
        thumbnailImageSrc: '../../assets/swipper/swipper5.jpg',
      },
      {
        itemImageSrc: '../../assets/swipper/swipper6.jpg',
        thumbnailImageSrc: '../../assets/swipper/swipper6.jpg',
      },
      {
        itemImageSrc: '../../assets/swipper/swipper7.webp',
        thumbnailImageSrc: '../../assets/swipper/swipper7.webp',
      },
    ];
  }
}
