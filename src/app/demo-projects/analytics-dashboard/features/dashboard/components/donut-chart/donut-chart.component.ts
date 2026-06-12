import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'ad-donut-chart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BaseChartDirective],
  template: `<canvas baseChart [data]="chartData" [options]="options" type="doughnut"></canvas>`,
  styles: [`:host { display: block; height: 260px; }`],
})
export class DonutChartComponent implements OnInit, OnChanges {
  @Input() labels: string[] = ['Direct', 'Organic', 'Referral', 'Social'];
  @Input() data: number[] = [35, 28, 22, 15];

  chartData: ChartConfiguration<'doughnut'>['data'] = { labels: [], datasets: [] };
  options: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8' } } },
  };

  ngOnInit(): void {
    this.updateChart();
  }

  ngOnChanges(): void {
    this.updateChart();
  }

  private updateChart(): void {
    this.chartData = {
      labels: this.labels,
      datasets: [
        {
          data: this.data,
          backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
          borderWidth: 0,
        },
      ],
    };
  }
}
