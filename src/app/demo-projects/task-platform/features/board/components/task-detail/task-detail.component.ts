import { ChangeDetectionStrategy, Component, Input, output } from '@angular/core';
import { Task } from '../../../../core/services/task.service';
import { PriorityBadgeComponent } from '../../../../shared/components/priority-badge/priority-badge.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'tp-task-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PriorityBadgeComponent, StatusBadgeComponent],
  template: `
    <div class="overlay" (click)="closed.emit()">
      <div class="panel" (click)="$event.stopPropagation()">
        <button type="button" class="close" (click)="closed.emit()">×</button>
        @if (task) {
          <h2>{{ task.title }}</h2>
          <div class="badges">
            <tp-priority-badge [priority]="task.priority" />
            <tp-status-badge [status]="task.status" />
          </div>
          <p class="desc">{{ task.description }}</p>
          <div class="meta">
            <p><strong>Due:</strong> {{ task.dueDate }}</p>
            <p><strong>Comments:</strong> {{ task.commentCount }}</p>
          </div>
          <div class="tags">
            @for (tag of task.tags; track tag) {
              <span class="tag">{{ tag }}</span>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 16px;
        box-sizing: border-box;
      }
      .panel {
        background: #1e293b;
        border-radius: 16px;
        padding: 32px;
        max-width: 520px;
        width: 100%;
        max-height: calc(100vh - 32px);
        overflow-y: auto;
        position: relative;
        font-family: 'Plus Jakarta Sans', sans-serif;
        color: #f1f5f9;
      }
      .close {
        position: absolute;
        top: 12px;
        right: 16px;
        background: none;
        border: none;
        color: #94a3b8;
        font-size: 24px;
        cursor: pointer;
      }
      h2 {
        margin: 0 0 12px;
        font-size: 20px;
      }
      .badges {
        display: flex;
        gap: 8px;
        margin-bottom: 16px;
      }
      .desc {
        color: #cbd5e1;
        font-size: 14px;
        line-height: 1.6;
      }
      .meta p {
        font-size: 13px;
        color: #94a3b8;
      }
      .tags {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        margin-top: 16px;
      }
      .tag {
        font-size: 11px;
        padding: 4px 10px;
        background: rgba(99, 102, 241, 0.15);
        color: #818cf8;
        border-radius: 9999px;
      }
    `,
  ],
})
export class TaskDetailComponent {
  @Input() task: Task | null = null;
  closed = output<void>();
}
