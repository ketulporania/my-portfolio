import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'ad-bar-chart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BaseChartDirective],
  template: `<canvas baseChart [data]="chartData" [options]="options" type="bar"></canvas>`,
  styles: [`:host { display: block; height: 260px; }`],
})
export class BarChartComponent implements OnChanges {
  @Input() labels: string[] = [];
  @Input() data: number[] = [];
  @Input() label = 'Series';

  chartData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  options: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: '#64748b' }, grid: { display: false } },
      y: { ticks: { color: '#64748b' }, grid: { color: 'rgba(148,163,184,0.1)' } },
    },
  };

  ngOnChanges(): void {
    this.chartData = {
      labels: this.labels,
      datasets: [{ data: this.data, label: this.label, backgroundColor: '#6366f1', borderRadius: 6 }],
    };
  }
}
