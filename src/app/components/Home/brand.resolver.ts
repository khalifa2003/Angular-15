import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { BrandService } from 'src/app/services/brand.service';
import { IBrand } from 'src/app/Models/ibrand';

@Injectable({ providedIn: 'root' })
export class BrandResolver implements Resolve<IBrand[]> {
  constructor(private brandService: BrandService) {}

  resolve(): Observable<IBrand[]> {
    return this.brandService.getAllBrands().pipe(
      catchError((error) => {
        console.error('Error loading data', error);
        return of();
      })
    );
  }
}
