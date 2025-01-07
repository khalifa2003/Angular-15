import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBrand } from '../Models/ibrand';
@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private http: HttpClient) {}

  getAllBrands(): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(`/brand`);
  }

  getBrand(id: String): Observable<IBrand> {
    return this.http.get<IBrand>(`/brand/${id}`);
  }

  // private only admin/manager
  createBrand(formData: FormData): Observable<IBrand> {
    return this.http.post<IBrand>(`/brand`, formData);
  }

  editBrand(id: string, formData: FormData): Observable<IBrand> {
    return this.http.put<IBrand>(`/brand/${id}`, formData);
  }

  deleteBrand(id: string): Observable<void> {
    return this.http.delete<void>(`/brand/${id}`);
  }
}
