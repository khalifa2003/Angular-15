import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private http: HttpClient) {}

  getWishlist(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/wishlist`);
  }

  addToWishlist(productId: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/wishlist`, { productId });
  }

  removeFromWishlist(productId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/wishlist/${productId}`);
  }
}
