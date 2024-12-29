import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/Models/iproduct';

@Injectable({ providedIn: 'root' })
export class ProductResolver implements Resolve<IProduct[]> {
  constructor(private productService: ProductService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IProduct[]> {
    return this.productService.getAllProducts().pipe(
      catchError((error) => {
        console.error('Error loading data', error);
        return of();
      })
    );
  }
}
