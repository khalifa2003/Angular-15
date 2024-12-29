import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  ordersStats: any;
  revenueStats: any;
  customersStats: any;
  commentsStats: any;
  recentSales: any[] = [];
  bestSellingProducts: any[] = [];
  notifications: any[] = [];
  salesOverview: any[] = [];
  loading: boolean = false;

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    this.userService
      .getDashboardData()
      .pipe(
        tap((data) => {
          this.ordersStats = data.ordersStats;
          this.revenueStats = data.revenueStats;
          this.customersStats = data.customersStats;
          this.commentsStats = data.commentsStats;
          this.recentSales = data.recentSales;
          this.bestSellingProducts = data.bestSellingProducts;
          this.notifications = data.notifications;
          this.salesOverview = data.salesOverview;

          this.renderSalesOverviewChart();
        }),
        catchError((error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load dashboard data. Please try again later.',
          });
          return of(null);
        }),
        tap(() => {
          this.loading = false;
        })
      )
      .subscribe();
  }

  renderSalesOverviewChart(): void {
    new Chart('salesOverviewChart', {
      type: 'line',
      data: {
        labels: this.salesOverview.map((data) => `${data._id}`),
        datasets: [
          {
            label: 'Total Sales',
            data: this.salesOverview.map((data) => data.totalSales),
            borderColor: '#42A5F5',
            fill: false,
          },
        ],
      },
    });
  }
}
