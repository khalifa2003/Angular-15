import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  // public
  getAllCategories(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/category`);
  }

  // private only admin/manager
  createCategory(formData: FormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}/category`, formData, {});
  }

  editCategory(id: string, formData: FormData): Observable<any> {
    return this.http.put(`${environment.apiUrl}/category/${id}`, formData, {});
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/category/${id}`, {});
  }
}
