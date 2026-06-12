import { ChangeDetectionStrategy, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'ad-line-chart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BaseChartDirective],
  template: `<canvas baseChart [data]="chartData" [options]="options" type="line"></canvas>`,
  styles: [`:host { display: block; height: 260px; }`],
})
export class LineChartComponent implements OnChanges {
  @Input() labels: string[] = [];
  @Input() data: number[] = [];
  @Input() label = 'Series';

  chartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  options: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#94a3b8' } } },
    scales: {
      x: { ticks: { color: '#64748b' }, grid: { color: 'rgba(148,163,184,0.1)' } },
      y: { ticks: { color: '#64748b' }, grid: { color: 'rgba(148,163,184,0.1)' } },
    },
  };

  ngOnChanges(): void {
    this.chartData = {
      labels: this.labels,
      datasets: [
        {
          data: this.data,
          label: this.label,
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99,102,241,0.1)',
          fill: true,
          tension: 0.4,
        },
      ],
    };
  }
}
