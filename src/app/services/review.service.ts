import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  addReview(title: string, ratings: number, product: string): Observable<any> {
    return this.http.post(`/reviews`, {
      title,
      ratings,
      product,
    });
  }

  getReviews(productId: string): Observable<any> {
    return this.http.get(
      `/reviews?productId=${productId}`
    );
  }

  deleteReview(id: string): Observable<any> {
    return this.http.delete(`/reviews/${id}`);
  }
}
