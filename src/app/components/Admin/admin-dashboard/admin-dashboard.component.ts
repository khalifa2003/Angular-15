import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { catchError, of, tap } from 'rxjs';
import { Dashboard } from 'src/app/Models/dashboard';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  Dashboard: Dashboard = {} as Dashboard;

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.userService
      .getDashboardData()
      .pipe(
        tap((data: Dashboard) => {
          this.Dashboard = data;
          this.renderSalesOverviewChart();
        }),
        catchError((error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load dashboard data. Please try again later.',
          });
          return of(null);
        })
      )
      .subscribe();
  }

  renderSalesOverviewChart(): void {
    new Chart('salesOverviewChart', {
      type: 'line',
      data: {
        labels: this.Dashboard.salesOverview.map((data) => `${data._id}`),
        datasets: [
          {
            label: 'Total Sales',
            data: this.Dashboard.salesOverview.map((data) => data.totalSales),
            borderColor: '#42A5F5',
            fill: false,
          },
        ],
      },
    });
  }
}
