import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubcategoryService {
  constructor(private http: HttpClient) {}

  // public
  getSubcategories(category: string = ''): Observable<any> {
    if (category == '') {
      return this.http.get(`/subcategory`);
    } else {
      return this.http.get(
        `/subcategory?category=${category}`
      );
    }
  }

  // private only admin/manager
  createSubcategory(formData: FormData) {
    return this.http.post(`/subcategory`, formData);
  }

  editSubcategory(id: string, formData: FormData): Observable<any> {
    return this.http.put(`/subcategory/${id}`, formData);
  }

  deleteSubcategory(id: string): Observable<any> {
    return this.http.delete(`/subcategory/${id}`);
  }
}
