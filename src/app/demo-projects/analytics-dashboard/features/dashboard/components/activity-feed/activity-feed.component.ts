import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ActivityItem } from '../../../../core/services/data-stream.service';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';

@Component({
  selector: 'ad-activity-feed',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollingModule, TimeAgoPipe],
  template: `
    <div class="feed">
      <h3>Live Activity</h3>
      <cdk-virtual-scroll-viewport itemSize="56" class="viewport">
        <div *cdkVirtualFor="let item of activity; trackBy: trackById" class="feed-item">
          <div class="avatar">{{ item.avatar }}</div>
          <div class="content">
            <p><strong>{{ item.user }}</strong> {{ item.action }}</p>
            <span class="meta">{{ item.time | timeAgo }} @if (item.amount) { · {{ item.amount }} }</span>
          </div>
        </div>
      </cdk-virtual-scroll-viewport>
    </div>
  `,
  styles: [
    `
      .feed {
        background: #1e293b;
        border: 1px solid rgba(99, 102, 241, 0.2);
        border-radius: 12px;
        padding: 20px;
        font-family: 'Inter', sans-serif;
        height: 100%;
      }
      h3 {
        color: #f1f5f9;
        margin: 0 0 16px;
        font-size: 16px;
      }
      .viewport {
        height: 320px;
      }
      .feed-item {
        display: flex;
        gap: 12px;
        padding: 10px 0;
        border-bottom: 1px solid rgba(148, 163, 184, 0.1);
        height: 56px;
        box-sizing: border-box;
      }
      .avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: #6366f1;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 600;
        flex-shrink: 0;
      }
      .content p {
        margin: 0;
        color: #e2e8f0;
        font-size: 13px;
      }
      .meta {
        color: #64748b;
        font-size: 11px;
      }
    `,
  ],
})
export class ActivityFeedComponent {
  @Input() activity: ActivityItem[] = [];

  trackById(_: number, item: ActivityItem): number {
    return item.id;
  }
}
