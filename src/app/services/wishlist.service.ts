import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private http: HttpClient) {}

  getWishlist(): Observable<any> {
    return this.http.get(`/wishlist`);
  }

  addToWishlist(productId: string): Observable<any> {
    return this.http.post(`/wishlist`, { productId });
  }

  removeFromWishlist(productId: string): Observable<any> {
    return this.http.delete(`/wishlist/${productId}`);
  }
}
