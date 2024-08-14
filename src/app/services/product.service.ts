import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/product`);
  }

  getProductById(id: String | null): Observable<any> {
    return this.http.get(`${this.apiUrl}/product/${id}`);
  }

  searchProducts(params: any): Observable<any> {
    let queryParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        queryParams = queryParams.set(key, params[key]);
      });
    }
    return this.http.get(`${this.apiUrl}/product`, {
      params: queryParams,
    });
  }

  // private only admin/manager
  createProduct(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      authorization: `Bearer ${this.authService.currentUserValue.token}`,
    });
    return this.http.post(`${this.apiUrl}/product`, formData, {
      headers,
    });
  }

  updateProduct(id: string, formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      authorization: `Bearer ${this.authService.currentUserValue.token}`,
    });
    return this.http.put(`${this.apiUrl}/product/${id}`, formData, {
      headers,
    });
  }

  deleteProduct(id: String) {
    const headers = new HttpHeaders({
      authorization: `Bearer ${this.authService.currentUserValue.token}`,
    });
    return this.http.delete(`${this.apiUrl}/product/${id}`, {
      headers,
    });
  }
}
