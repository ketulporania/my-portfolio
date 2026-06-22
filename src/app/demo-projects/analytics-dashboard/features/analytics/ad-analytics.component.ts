import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { AdNavbarComponent } from '../../shared/components/navbar/ad-navbar.component';
import { AdSidebarComponent } from '../../shared/components/sidebar/ad-sidebar.component';
import { LineChartComponent } from '../dashboard/components/line-chart/line-chart.component';
import { BarChartComponent } from '../dashboard/components/bar-chart/bar-chart.component';
import { selectAdCharts } from '../../store/dashboard/dashboard.selectors';
import { loadDashboard } from '../../store/dashboard/dashboard.actions';

@Component({
  selector: 'ad-analytics',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, AdNavbarComponent, AdSidebarComponent, LineChartComponent, BarChartComponent],
  template: `
    <div class="ad-app">
      <ad-navbar />
      <div class="layout">
        <ad-sidebar />
        <main class="main">
          <h1>Deep Analytics</h1>
          <p class="desc">Detailed session and conversion analytics with historical trends.</p>
          @if (charts$ | async; as charts) {
            <div class="charts">
              <div class="chart-card">
                <h3>Session Duration</h3>
                <ad-line-chart [labels]="charts.labels" [data]="charts.sessions" label="Sessions (s)" />
              </div>
              <div class="chart-card">
                <h3>Monthly Revenue</h3>
                <ad-bar-chart [labels]="charts.labels" [data]="charts.revenue" label="Revenue" />
              </div>
            </div>
          }
        </main>
      </div>
    </div>
  `,
  styles: [
    `
      .ad-app {
        min-height: calc(100vh - 44px);
        background: #0a0e1a;
        color: #f1f5f9;
        font-family: 'Inter', sans-serif;
      }
      .layout {
        display: flex;
      }
      .main {
        flex: 1;
        padding: 24px;
        min-width: 0;
      }
      h1 {
        margin: 0 0 8px;
        font-size: 22px;
      }
      .desc {
        color: #64748b;
        margin: 0 0 24px;
        font-size: 14px;
      }
      .charts {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }
      .chart-card {
        background: #1e293b;
        border: 1px solid rgba(99, 102, 241, 0.2);
        border-radius: 12px;
        padding: 20px;
      }
      .chart-card h3 {
        margin: 0 0 12px;
        font-size: 14px;
        color: #94a3b8;
      }

      @media (max-width: 900px) {
        .charts {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 768px) {
        .main {
          padding: 16px;
        }

        h1 {
          font-size: 18px;
        }

        .chart-card {
          padding: 16px;
        }
      }
    `,
  ],
})
export class AdAnalyticsComponent implements OnInit {
  private store = inject(Store);
  charts$ = this.store.select(selectAdCharts);

  ngOnInit(): void {
    this.store.dispatch(loadDashboard());
  }
}
