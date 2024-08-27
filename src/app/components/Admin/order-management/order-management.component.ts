import { Component, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { IOrder } from 'src/app/Models/iorder';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css'],
})
export class OrderManagementComponent {
  orderDialog: boolean = false;
  orders: IOrder[] = [];
  order: IOrder = {} as IOrder;

  constructor(
    private orderService: OrderService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  openOrder(order: IOrder) {
    this.order = order;
    this.orderDialog = true;
  }

  getAllOrders() {
    this.orderService.getAllOrders().subscribe((res) => {
      this.orders = res;
    });
  }

  updateToDelivered() {
    this.orderService.updateToDelivered(this.order._id).subscribe((res) => {
      this.orderDialog = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Order Updated successfully',
      });
      this.getAllOrders();
    });
  }

  deleteOrder(order: IOrder) {
    this.orderService.deleteOrder(order._id).subscribe((res) => {
      this.getAllOrders();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `'${order._id}' removed Successfully`,
      });
    });
  }

  @ViewChild('dt') dt: Table = {} as Table;
  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement?.value || '';
    this.dt.filterGlobal(value, 'contains');
  }
}
