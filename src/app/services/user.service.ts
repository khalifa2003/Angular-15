import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient, private authService: AuthService) {}

  getMe(): Observable<any> {
    const headers = new HttpHeaders({
      authorization: `Bearer ${this.authService.currentUserValue.token}`,
    });

    return this.http.get(`${this.apiUrl}/users/getMe`, { headers });
  }

  updateMe(formData: any): Observable<any> {
    const headers = new HttpHeaders({
      authorization: `Bearer ${this.authService.currentUserValue.token}`,
    });
    return this.http.put(`${this.apiUrl}/users/updateMe`, formData, {
      headers,
    });
  }
}
