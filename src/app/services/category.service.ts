import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient, private authService: AuthService) {}

  // public
  getAllCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/category`);
  }

  // private only admin/manager
  createCategory(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      authorization: `Bearer ${this.authService.currentUserValue.token}`,
    });
    return this.http.post(`${this.apiUrl}/category`, formData, {
      headers,
    });
  }

  editCategory(id: string, formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      authorization: `Bearer ${this.authService.currentUserValue.token}`,
    });
    return this.http.put(`${this.apiUrl}/category/${id}`, formData, {
      headers,
    });
  }

  deleteCategory(id: string): Observable<any> {
    const headers = new HttpHeaders({
      authorization: `Bearer ${this.authService.currentUserValue.token}`,
    });
    return this.http.delete(`${this.apiUrl}/category/${id}`, {
      headers,
    });
  }
}
