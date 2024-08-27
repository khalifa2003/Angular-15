import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from '../Models/iorder';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/orders'; // Adjust the URL if needed

  constructor(private http: HttpClient, private authService: AuthService) {}

  // User
  createOrder(order: any, cartId: string): Observable<IOrder> {
    const headers = new HttpHeaders({
      authorization: `Bearer ${this.authService.currentUserValue.token}`,
    });
    return this.http.post<IOrder>(`${this.apiUrl}/${cartId}`, order, {
      headers,
    });
  }

  getLoggedUserOrders(): Observable<any> {
    const headers = new HttpHeaders({
      authorization: `Bearer ${this.authService.currentUserValue.token}`,
    });
    return this.http.get<any>(`${this.apiUrl}/userOrders`, { headers });
  }

  // Admin
  getAllOrders(): Observable<IOrder[]> {
    const headers = new HttpHeaders({
      authorization: `Bearer ${this.authService.currentUserValue.token}`,
    });
    return this.http.get<IOrder[]>(this.apiUrl, { headers });
  }

  updateToDelivered(orderId: string) {
    const headers = new HttpHeaders({
      authorization: `Bearer ${this.authService.currentUserValue.token}`,
    });
    return this.http.put<void>(
      `${this.apiUrl}/delivered/${orderId}`,
      {},
      {
        headers,
      }
    );
  }

  updateOrder(id: string, order: Partial<IOrder>): Observable<IOrder> {
    const headers = new HttpHeaders({
      authorization: `Bearer ${this.authService.currentUserValue.token}`,
    });
    return this.http.put<IOrder>(`${this.apiUrl}/${id}`, order, { headers });
  }

  deleteOrder(id: string): Observable<void> {
    const headers = new HttpHeaders({
      authorization: `Bearer ${this.authService.currentUserValue.token}`,
    });
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
