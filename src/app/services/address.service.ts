import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: HttpClient) {}

  addAddress(formData: FormData): Observable<any> {
    return this.http.post(`/address`, formData);
  }

  deleteAddress(addressId: string): Observable<any> {
    return this.http.delete(`/address/${addressId}`);
  }

  getAddresses(): Observable<any> {
    return this.http.get(`/address`);
  }
}
