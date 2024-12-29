import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  addToCart(productId: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/cart`, { productId });
  }

  getCart(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/cart`);
  }

  updateCartItemQuantity(productId: string, quantity: number): Observable<any> {
    return this.http.put(`${environment.apiUrl}/cart/${productId}`, {
      quantity,
    });
  }

  deleteCart() {
    return this.http.delete(`${environment.apiUrl}/cart`);
  }

  deleteCartItem(itemId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/cart/${itemId}`);
  }
}
