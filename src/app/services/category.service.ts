import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../Models/icategory';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  // public
  getAllCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`/category`);
  }

  // private only admin/manager
  createCategory(formData: FormData): Observable<ICategory> {
    return this.http.post<ICategory>(`/category`, formData);
  }

  editCategory(id: string, formData: FormData): Observable<ICategory> {
    return this.http.put<ICategory>(`/category/${id}`, formData);
  }

  deleteCategory(id: string): Observable<ICategory> {
    return this.http.delete<ICategory>(`/category/${id}`);
  }
}
