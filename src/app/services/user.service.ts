import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getMe(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user/me`);
  }
  getAllUsers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user`);
  }

  updateLoggedUserData(formData: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/user/me`, formData);
  }

  updateLoggedUserPassword(passwords: FormData): Observable<any> {
    return this.http.put(`${environment.apiUrl}/user/me/password`, passwords);
  }

  makeManager(id: string): Observable<any> {
    return this.http.put(`${environment.apiUrl}/user/${id}/role`, {});
  }

  deleteUser(id: string) {
    return this.http.delete(`${environment.apiUrl}/user/${id}`);
  }

  getDashboardData(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/dashboard`);
  }
}
