import { OrderService } from './../../../services/order.service';
import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { IOrder } from 'src/app/Models/iorder';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  orders: IOrder[] = [];
  loading: boolean = false;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }
  loadOrders(): void {
    this.loading = true;
    this.orderService
      .getLoggedUserOrders()
      .pipe(
        tap((orders) => {
          this.orders = orders;
        }),
        tap(() => {
          this.loading = false;
        })
      )
      .subscribe();
  }
}
