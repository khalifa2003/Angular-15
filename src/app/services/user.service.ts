import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getMe(): Observable<any> {
    return this.http.get(`/user/me`);
  }
  getAllUsers(): Observable<any> {
    return this.http.get(`/user`);
  }

  updateLoggedUserData(formData: any): Observable<any> {
    return this.http.put(`/user/me`, formData);
  }

  updateLoggedUserPassword(passwords: FormData): Observable<any> {
    return this.http.put(`/user/me/password`, passwords);
  }

  makeManager(id: string): Observable<any> {
    return this.http.put(`/user/${id}/role`, {});
  }

  deleteUser(id: string) {
    return this.http.delete(`/user/${id}`);
  }

  getDashboardData(): Observable<any> {
    return this.http.get<any>(`/dashboard`);
  }
}
