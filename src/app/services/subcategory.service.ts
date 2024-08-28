import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubcategoryService {
  constructor(private http: HttpClient) {}

  // public
  getSubcategories(category: string = ''): Observable<any> {
    if (category == '') {
      return this.http.get(`${environment.apiUrl}/subcategory`);
    } else {
      return this.http.get(
        `${environment.apiUrl}/subcategory?category=${category}`
      );
    }
  }

  // private only admin/manager
  createSubcategory(formData: FormData) {
    return this.http.post(`${environment.apiUrl}/subcategory`, formData);
  }

  editSubcategory(id: string, formData: FormData): Observable<any> {
    return this.http.put(`${environment.apiUrl}/subcategory/${id}`, formData);
  }

  deleteSubcategory(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/subcategory/${id}`);
  }
}
