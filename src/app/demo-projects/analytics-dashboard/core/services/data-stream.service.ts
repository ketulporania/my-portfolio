import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, map, merge, Observable, scan, startWith } from 'rxjs';

export interface KpiMetric {
  id: string;
  label: string;
  value: number;
  change: number;
  prefix: string;
  suffix: string;
  trend: number[];
  status: 'up' | 'down';
}

export interface ActivityItem {
  id: number;
  user: string;
  action: string;
  amount?: string;
  time: string;
  avatar: string;
  type: string;
}

export interface ChartSeries {
  labels: string[];
  revenue: number[];
  users: number[];
  sessions: number[];
  trafficSources: {
    labels: string[];
    values: number[];
  };
}

@Injectable({ providedIn: 'root' })
export class DataStreamService {
  private http = inject(HttpClient);

  loadMetrics(): Observable<KpiMetric[]> {
    return this.http.get<KpiMetric[]>('/data/ad-metrics.json');
  }

  loadActivityFeed(): Observable<ActivityItem[]> {
    return this.http.get<ActivityItem[]>('/data/ad-activity-feed.json');
  }

  loadChartSeries(): Observable<ChartSeries> {
    return this.http.get<ChartSeries>('/data/ad-chart-series.json');
  }

  streamMetrics(base: KpiMetric[]): Observable<KpiMetric[]> {
    return interval(3000).pipe(
      startWith(0),
      map(() =>
        base.map((m) => ({
          ...m,
          value: m.value + Math.floor(Math.random() * 200 - 50),
          change: +(m.change + (Math.random() * 0.4 - 0.2)).toFixed(1),
        }))
      )
    );
  }

  streamActivity(base: ActivityItem[]): Observable<ActivityItem[]> {
    const names = ['Alice Johnson', 'Bob Smith', 'Carol White', 'David Lee', 'Eva Chen'];
    const actions = ['completed purchase', 'signed up', 'upgraded plan', 'viewed dashboard', 'exported report'];
    return interval(5000).pipe(
      startWith(0),
      scan(
        (items) => {
          const newest: ActivityItem = {
            id: Date.now(),
            user: names[Math.floor(Math.random() * names.length)],
            action: actions[Math.floor(Math.random() * actions.length)],
            amount: `$${Math.floor(Math.random() * 500 + 50)}`,
            time: 'just now',
            avatar: 'NA',
            type: 'live',
          };
          return [newest, ...items.slice(0, 199)];
        },
        base
      )
    );
  }
}
