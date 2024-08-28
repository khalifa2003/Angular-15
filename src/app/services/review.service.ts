import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  addReview(title: string, ratings: number, product: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/reviews`, {
      title,
      ratings,
      product,
    });
  }

  getReviews(productId: string): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/reviews?productId=${productId}`
    );
  }

  deleteReview(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/reviews/${id}`);
  }
}
