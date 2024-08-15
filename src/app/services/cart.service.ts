import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient, private authService: AuthService) {}

  addToCart(productId: string): Observable<any> {
    const headers = new HttpHeaders({
      authorization: `Bearer ${this.authService.currentUserValue.token}`,
    });

    return this.http.post(
      `${this.apiUrl}/cart`,
      { productId },
      {
        headers,
      }
    );
  }

  getCart(): Observable<any> {
    const headers = new HttpHeaders({
      authorization: `Bearer ${this.authService.currentUserValue.token}`,
    });
    return this.http.get(`${this.apiUrl}/cart`, { headers });
  }

  updateCartItemQuantity(productId: string, quantity: number): Observable<any> {
    const headers = new HttpHeaders({
      authorization: `Bearer ${this.authService.currentUserValue.token}`,
    });
    return this.http.put(
      `${this.apiUrl}/cart/${productId}`,
      { quantity },
      {
        headers,
      }
    );
  }

  deleteCart() {
    const headers = new HttpHeaders({
      authorization: `Bearer ${this.authService.currentUserValue.token}`,
    });
    return this.http.delete(`${this.apiUrl}/cart`, { headers });
  }

  deleteCartItem(productId: string): Observable<any> {
    const headers = new HttpHeaders({
      authorization: `Bearer ${this.authService.currentUserValue.token}`,
    });
    return this.http.delete(`${this.apiUrl}/cart/${productId}`, {
      headers,
    });
  }
}
