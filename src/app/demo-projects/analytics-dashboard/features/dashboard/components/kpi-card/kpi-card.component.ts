import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AnimateCounterDirective } from '../../../../shared/directives/animate-counter.directive';
import { AdBadgeComponent } from '../../../../shared/components/badge/badge.component';
import { SparklineComponent } from '../../../../shared/components/sparkline/sparkline.component';
import { KpiMetric } from '../../../../core/services/data-stream.service';

@Component({
  selector: 'ad-kpi-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AnimateCounterDirective, AdBadgeComponent, SparklineComponent],
  template: `
    <div class="kpi-card">
      <p class="label">{{ metric.label }}</p>
      <p class="value">
        <span [adAnimateCounter]="metric.value" [prefix]="metric.prefix" [suffix]="metric.suffix"></span>
      </p>
      <div class="footer">
        <ad-badge [type]="metric.status === 'up' ? 'up' : 'down'">
          {{ metric.change > 0 ? '+' : '' }}{{ metric.change }}%
        </ad-badge>
        <ad-sparkline [data]="metric.trend" />
      </div>
    </div>
  `,
  styles: [
    `
      .kpi-card {
        background: #1e293b;
        border: 1px solid rgba(99, 102, 241, 0.2);
        border-radius: 12px;
        padding: 20px;
        font-family: 'Inter', sans-serif;
      }
      .label {
        color: #94a3b8;
        font-size: 13px;
        margin: 0 0 8px;
      }
      .value {
        color: #f1f5f9;
        font-size: 28px;
        font-weight: 700;
        margin: 0 0 12px;
      }
      .footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }
    `,
  ],
})
export class KpiCardComponent {
  @Input({ required: true }) metric!: KpiMetric;
}
