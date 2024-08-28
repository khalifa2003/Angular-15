import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: HttpClient) {}

  addAddress(formData: FormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}/address`, formData);
  }

  deleteAddress(addressId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/address/${addressId}`);
  }

  getAddresses(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/address`);
  }
}
