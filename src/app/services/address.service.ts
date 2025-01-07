import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAddress } from '../Models/iaddress';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: HttpClient) {}

  addAddress(formData: FormData): Observable<IAddress[]> {
    return this.http.post<IAddress[]>(`/address`, formData);
  }

  deleteAddress(addressId: string): Observable<IAddress[]> {
    return this.http.delete<IAddress[]>(`/address/${addressId}`);
  }

  getAddresses(): Observable<IAddress[]> {
    return this.http.get<IAddress[]>(`/address`);
  }
}
