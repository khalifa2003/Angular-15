import { CartRes } from './../Models/icart';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICart } from '../Models/icart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  addToCart(productId: string): Observable<CartRes> {
    return this.http.post<CartRes>(`/cart`, { productId });
  }

  getCart(): Observable<CartRes> {
    return this.http.get<CartRes>(`/cart`);
  }

  updateCartItemQuantity(
    productId: string,
    quantity: number
  ): Observable<CartRes> {
    return this.http.put<CartRes>(`/cart/${productId}`, {
      quantity,
    });
  }

  deleteCart() {
    return this.http.delete(`/cart`);
  }

  deleteCartItem(itemId: string): Observable<CartRes> {
    return this.http.delete<CartRes>(`/cart/${itemId}`);
  }
}
