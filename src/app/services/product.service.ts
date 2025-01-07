import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../Models/iproduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`/product`);
  }

  getHomeProducts(): Observable<any> {
    return this.http.get(`/product/home-products`);
  }

  getProductById(id: String | null): Observable<IProduct> {
    return this.http.get<IProduct>(`/product/${id}`);
  }

  searchProducts(params: any): Observable<IProduct[]> {
    let queryParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        queryParams = queryParams.set(key, params[key]);
      });
    }
    return this.http.get<IProduct[]>(`/product`, {
      params: queryParams,
    });
  }

  // private only admin/manager
  createProduct(formData: FormData): Observable<IProduct> {
    return this.http.post<IProduct>(`/product`, formData);
  }

  updateProduct(id: string, formData: FormData): Observable<IProduct> {
    return this.http.put<IProduct>(`/product/${id}`, formData);
  }

  deleteProduct(id: String) {
    return this.http.delete(`/product/${id}`);
  }
}
