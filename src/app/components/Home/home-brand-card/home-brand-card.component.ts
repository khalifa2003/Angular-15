import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IBrand } from 'src/app/Models/ibrand';

@Component({
  selector: 'app-home-brand-card',
  templateUrl: './home-brand-card.component.html',
  styleUrls: ['./home-brand-card.component.css'],
})
export class HomeBrandCardComponent {
  @Input() brand: IBrand = {} as IBrand;

  constructor(private router: Router) {}

  getProductByBrand(item: IBrand) {
    this.router.navigate(['/product'], {
      queryParams: { brand: item._id },
    });
  }
}
