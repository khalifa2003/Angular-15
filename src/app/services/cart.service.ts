import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  addToCart(productId: string): Observable<any> {
    return this.http.post(`/cart`, { productId });
  }

  getCart(): Observable<any> {
    return this.http.get(`/cart`);
  }

  updateCartItemQuantity(productId: string, quantity: number): Observable<any> {
    return this.http.put(`/cart/${productId}`, {
      quantity,
    });
  }

  deleteCart() {
    return this.http.delete(`/cart`);
  }

  deleteCartItem(itemId: string): Observable<any> {
    return this.http.delete(`/cart/${itemId}`);
  }
}
