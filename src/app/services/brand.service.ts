import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private http: HttpClient) {}

  getAllBrands(): Observable<any> {
    return this.http.get(`/brand`);
  }

  getBrand(id: String): Observable<any> {
    return this.http.get(`/brand/${id}`);
  }

  // private only admin/manager
  createBrand(formData: FormData) {
    return this.http.post(`/brand`, formData);
  }

  editBrand(id: string, formData: FormData): Observable<any> {
    return this.http.put(`/brand/${id}`, formData);
  }

  deleteBrand(id: string): Observable<any> {
    return this.http.delete(`/brand/${id}`);
  }
}
