import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubcategoryService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient, private authService: AuthService) {}

  // public
  getSubcategories(category: string = ''): Observable<any> {
    if (category == '') {
      return this.http.get(`${this.apiUrl}/subcategory`);
    } else {
      return this.http.get(`${this.apiUrl}/subcategory?category=${category}`);
    }
  }

  // private only admin/manager
  createSubcategory(formData: FormData) {
    const headers = new HttpHeaders({
      authorization: `Bearer ${this.authService.currentUserValue.token}`,
    });
    return this.http.post(`${this.apiUrl}/subcategory`, formData, {
      headers,
    });
  }

  editSubcategory(id: string, formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      authorization: `Bearer ${this.authService.currentUserValue.token}`,
    });
    return this.http.put(`${this.apiUrl}/subcategory/${id}`, formData, {
      headers,
    });
  }

  deleteSubcategory(id: string): Observable<any> {
    const headers = new HttpHeaders({
      authorization: `Bearer ${this.authService.currentUserValue.token}`,
    });
    return this.http.delete(`${this.apiUrl}/subcategory/${id}`, { headers });
  }
}
