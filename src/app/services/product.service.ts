import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/product`);
  }

  getProductById(id: String | null): Observable<any> {
    return this.http.get(`${environment.apiUrl}/product/${id}`);
  }

  searchProducts(params: any): Observable<any> {
    let queryParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        queryParams = queryParams.set(key, params[key]);
      });
    }
    return this.http.get(`${environment.apiUrl}/product`, {
      params: queryParams,
    });
  }

  // private only admin/manager
  createProduct(formData: FormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}/product`, formData);
  }

  updateProduct(id: string, formData: FormData): Observable<any> {
    return this.http.put(`${environment.apiUrl}/product/${id}`, formData);
  }

  deleteProduct(id: String) {
    return this.http.delete(`${environment.apiUrl}/product/${id}`);
  }
}
