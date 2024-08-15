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
    return this.http.post(`${this.apiUrl}/wishlist`, {
      headers,
    });
  }

  addToWishlist(product: IProduct) {
    const headers = new HttpHeaders({
      authorization: `Bearer ${this.authService.currentUserValue.token}`,
    });
    this.authService.currentUserValue.data.wishlist.push(product._id);
    localStorage.setItem(
      'currentUser',
      JSON.stringify(this.authService.currentUserValue)
    );
    return this.http.post(`${this.apiUrl}/wishlist`, product, {
      headers,
    });
  }

  isInWishlist(_id: string) {
    return this.authService.isUserLogged
      ? this.authService.currentUserValue.data.wishlist.includes(_id)
      : false;
  }

  removeFromWishlist(product: IProduct) {
    const headers = new HttpHeaders({
      authorization: `Bearer ${this.authService.currentUserValue.token}`,
    });
    this.authService.currentUserValue.data.wishlist.splice(
      this.authService.currentUserValue.data.wishlist.indexOf(product._id),
      1
    );
    localStorage.setItem(
      'currentUser',
      JSON.stringify(this.authService.currentUserValue)
    );

    return this.http.delete(`${this.apiUrl}/wishlist/${product._id}`, {
      headers,
    });
  }
}
