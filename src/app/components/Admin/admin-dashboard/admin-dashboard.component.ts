import { UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';

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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getDashboardData().subscribe((data: any) => {
      this.ordersStats = data.ordersStats;
      this.revenueStats = data.revenueStats;
      this.customersStats = data.customersStats;
      this.commentsStats = data.commentsStats;
      this.recentSales = data.recentSales;
      this.bestSellingProducts = data.bestSellingProducts;
      this.notifications = data.notifications;
      this.salesOverview = data.salesOverview;
      console.log(this.salesOverview);

      this.renderSalesOverviewChart();
    });
  }

  renderSalesOverviewChart() {
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
