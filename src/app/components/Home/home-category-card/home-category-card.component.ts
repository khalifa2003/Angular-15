import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/Models/icategory';

@Component({
  selector: 'app-home-category-card',
  templateUrl: './home-category-card.component.html',
  styleUrls: ['./home-category-card.component.css'],
})
export class HomeCategoryCardComponent {
  @Input() category: ICategory = {} as ICategory;

  constructor(private router: Router) {}

  getProductByCategory(item: ICategory) {
    this.router.navigate(['/product'], {
      queryParams: { category: item._id },
    });
  }
}
