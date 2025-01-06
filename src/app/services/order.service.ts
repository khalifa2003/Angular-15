import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from '../Models/iorder';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  // User
  createOrder(order: any, cartId: string): Observable<IOrder> {
    return this.http.post<IOrder>(
      `/orders/${cartId}`,
      order
    );
  }

  getLoggedUserOrders(): Observable<any> {
    return this.http.get<any>(`/orders/userOrders`);
  }

  // Admin
  getAllOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`/orders`);
  }

  updateToDelivered(orderId: string) {
    return this.http.put<void>(
      `/orders/delivered/${orderId}`,
      {}
    );
  }

  updateOrder(id: string, order: Partial<IOrder>): Observable<IOrder> {
    return this.http.put<IOrder>(`/orders/${id}`, order);
  }

  deleteOrder(id: string): Observable<void> {
    return this.http.delete<void>(`/orders/${id}`);
  }
}
