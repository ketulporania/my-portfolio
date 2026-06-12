import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { AdNavbarComponent } from '../../shared/components/navbar/ad-navbar.component';
import { AdSidebarComponent } from '../../shared/components/sidebar/ad-sidebar.component';
import { KpiCardComponent } from './components/kpi-card/kpi-card.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { DonutChartComponent } from './components/donut-chart/donut-chart.component';
import { ActivityFeedComponent } from './components/activity-feed/activity-feed.component';
import {
  selectAdActivity,
  selectAdCharts,
  selectAdDashboardLoading,
  selectAdMetrics,
  selectAdStreaming,
} from '../../store/dashboard/dashboard.selectors';
import { loadDashboard, startStream, stopStream } from '../../store/dashboard/dashboard.actions';

@Component({
  selector: 'ad-dashboard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    AdNavbarComponent,
    AdSidebarComponent,
    KpiCardComponent,
    LineChartComponent,
    BarChartComponent,
    DonutChartComponent,
    ActivityFeedComponent,
  ],
  template: `
    <div class="ad-app">
      <ad-navbar />
      <div class="layout">
        <ad-sidebar />
        <main class="main">
          <header class="page-header">
            <h1>Dashboard Overview</h1>
            @if (streaming$ | async) {
              <span class="live-badge"><span class="dot"></span> Live streaming</span>
            }
          </header>
          @if (loading$ | async) {
            <p class="loading">Loading metrics...</p>
          } @else {
            <div class="kpi-grid">
              @for (metric of metrics$ | async; track metric.id) {
                <ad-kpi-card [metric]="metric" />
              }
            </div>
            <div class="charts-grid">
              @if (charts$ | async; as charts) {
                <div class="chart-card">
                  <h3>Revenue Trend</h3>
                  <ad-line-chart [labels]="charts.labels" [data]="charts.revenue" label="Revenue" />
                </div>
                <div class="chart-card">
                  <h3>User Growth</h3>
                  <ad-bar-chart [labels]="charts.labels" [data]="charts.users" label="Users" />
                </div>
                <div class="chart-card">
                  <h3>Traffic Sources</h3>
                  <ad-donut-chart
                    [labels]="charts.trafficSources.labels"
                    [data]="charts.trafficSources.values" />
                </div>
              }
              <div class="chart-card feed-card">
                <ad-activity-feed [activity]="(activity$ | async) ?? []" />
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
      }
      .page-header {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 24px;
      }
      h1 {
        margin: 0;
        font-size: 22px;
      }
      .live-badge {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        color: #10b981;
        background: rgba(16, 185, 129, 0.1);
        padding: 4px 10px;
        border-radius: 9999px;
      }
      .dot {
        width: 6px;
        height: 6px;
        background: #10b981;
        border-radius: 50%;
        animation: pulse 2s infinite;
      }
      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }
      .kpi-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 16px;
        margin-bottom: 24px;
      }
      .charts-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
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
      .feed-card {
        grid-column: span 2;
      }
      .loading {
        color: #64748b;
      }
    `,
  ],
})
export class AdDashboardComponent implements OnInit, OnDestroy {
  private store = inject(Store);

  metrics$ = this.store.select(selectAdMetrics);
  activity$ = this.store.select(selectAdActivity);
  charts$ = this.store.select(selectAdCharts);
  loading$ = this.store.select(selectAdDashboardLoading);
  streaming$ = this.store.select(selectAdStreaming);

  ngOnInit(): void {
    this.store.dispatch(loadDashboard());
    this.store.dispatch(startStream());
  }

  ngOnDestroy(): void {
    this.store.dispatch(stopStream());
  }
}
