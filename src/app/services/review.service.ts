import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient, private authService: AuthService) {}

  addReview(title: string, ratings: number, product: string): Observable<any> {
    const headers = new HttpHeaders({
      authorization: `Bearer ${this.authService.currentUserValue.token}`,
    });

    return this.http.post(
      `${this.apiUrl}/reviews`,
      {
        title,
        ratings,
        product,
      },
      {
        headers,
      }
    );
  }

  getReviews(productId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/reviews?productId=${productId}`);
  }

  deleteReview(id: string): Observable<any> {
    const headers = new HttpHeaders({
      authorization: `Bearer ${this.authService.currentUserValue.token}`,
    });

    return this.http.delete(`${this.apiUrl}/reviews/${id}`, { headers });
  }
}
