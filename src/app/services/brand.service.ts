import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllBrands(): Observable<any> {
    return this.http.get(`${this.apiUrl}/brand`);
  }

  getBrand(id: String): Observable<any> {
    return this.http.get(`${this.apiUrl}/brand/${id}`);
  }

  // private only admin/manager
  createBrand(formData: FormData) {
    const headers = new HttpHeaders({
      authorization: `Bearer ${this.authService.currentUserValue.token}`,
    });
    return this.http.post(`${this.apiUrl}/brand`, formData, {
      headers,
    });
  }

  editBrand(id: string, formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      authorization: `Bearer ${this.authService.currentUserValue.token}`,
    });
    return this.http.put(`${this.apiUrl}/brand/${id}`, formData, {
      headers,
    });
  }

  deleteBrand(id: string): Observable<any> {
    const headers = new HttpHeaders({
      authorization: `Bearer ${this.authService.currentUserValue.token}`,
    });
    return this.http.delete(`${this.apiUrl}/brand/${id}`, { headers });
  }
}
