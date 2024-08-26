import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient, private authService: AuthService) {}

  addAddress(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      authorization: `Bearer ${this.authService.currentUserValue.token}`,
    });
    return this.http.post(`${this.apiUrl}/address`, formData, {
      headers,
    });
  }

  deleteAddress(addressId: string): Observable<any> {
    const headers = new HttpHeaders({
      authorization: `Bearer ${this.authService.currentUserValue.token}`,
    });
    return this.http.delete(`${this.apiUrl}/address/${addressId}`, {
      headers,
    });
  }

  getAddresses(): Observable<any> {
    const headers = new HttpHeaders({
      authorization: `Bearer ${this.authService.currentUserValue.token}`,
    });

    return this.http.get(`${this.apiUrl}/address`, { headers });
  }
}
