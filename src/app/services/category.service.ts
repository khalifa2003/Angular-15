import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  // public
  getAllCategories(): Observable<any> {
    return this.http.get(`/category`);
  }

  // private only admin/manager
  createCategory(formData: FormData): Observable<any> {
    return this.http.post(`/category`, formData, {});
  }

  editCategory(id: string, formData: FormData): Observable<any> {
    return this.http.put(`/category/${id}`, formData, {});
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`/category/${id}`, {});
  }
}
