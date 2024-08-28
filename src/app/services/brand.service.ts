import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private http: HttpClient) {}

  getAllBrands(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/brand`);
  }

  getBrand(id: String): Observable<any> {
    return this.http.get(`${environment.apiUrl}/brand/${id}`);
  }

  // private only admin/manager
  createBrand(formData: FormData) {
    return this.http.post(`${environment.apiUrl}/brand`, formData);
  }

  editBrand(id: string, formData: FormData): Observable<any> {
    return this.http.put(`${environment.apiUrl}/brand/${id}`, formData);
  }

  deleteBrand(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/brand/${id}`);
  }
}
