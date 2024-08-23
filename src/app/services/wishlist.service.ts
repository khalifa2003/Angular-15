import { UserService } from 'src/app/services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { IProduct } from '../Models/iproduct';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient, private authService: AuthService) {}

  getWishlist(): Observable<any> {
    const headers = new HttpHeaders({
      authorization: `Bearer ${this.authService.currentUserValue.token}`,
    });
    return this.http.get(`${this.apiUrl}/wishlist`, {
      headers,
    });
  }

  addToWishlist(productId: string) {
    const headers = new HttpHeaders({
      authorization: `Bearer ${this.authService.currentUserValue.token}`,
    });

    return this.http.post(
      `${this.apiUrl}/wishlist`,
      { productId },
      {
        headers,
      }
    );
  }

  removeFromWishlist(productId: string) {
    const headers = new HttpHeaders({
      authorization: `Bearer ${this.authService.currentUserValue.token}`,
    });
    return this.http.delete(`${this.apiUrl}/wishlist/${productId}`, {
      headers,
    });
  }
}
