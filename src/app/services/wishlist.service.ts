import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../Models/iproduct';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private http: HttpClient) {}

  getWishlist(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`/wishlist`);
  }

  getWishlistProductsIds(): Observable<string[]> {
    return this.http.get<string[]>(`/wishlist/ids`);
  }

  addToWishlist(productId: string): Observable<IProduct[]> {
    return this.http.post<IProduct[]>(`/wishlist`, { productId });
  }

  removeFromWishlist(productId: string): Observable<IProduct[]> {
    return this.http.delete<IProduct[]>(`/wishlist/${productId}`);
  }
}
