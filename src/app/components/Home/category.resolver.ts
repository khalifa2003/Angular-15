import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { ICategory } from 'src/app/Models/icategory';

@Injectable({ providedIn: 'root' })
export class CategoryResolver implements Resolve<ICategory[]> {
  constructor(private categoryService: CategoryService) {}

  resolve(): Observable<ICategory[]> {
    return this.categoryService.getAllCategories().pipe(
      catchError((error) => {
        console.error('Error loading data', error);
        return of();
      })
    );
  }
}
