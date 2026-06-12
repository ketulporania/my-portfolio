import { ChangeDetectionStrategy, Component, Input, output } from '@angular/core';
import { Task } from '../../../../core/services/task.service';
import { PriorityBadgeComponent } from '../../../../shared/components/priority-badge/priority-badge.component';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';

@Component({
  selector: 'tp-task-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PriorityBadgeComponent, TruncatePipe],
  template: `
    <div class="task-card" (click)="selected.emit(task.id)">
      <tp-priority-badge [priority]="task.priority" />
      <h4>{{ task.title | truncate: 40 }}</h4>
      <div class="meta">
        @for (tag of task.tags.slice(0, 2); track tag) {
          <span class="tag">{{ tag }}</span>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .task-card {
        background: #0f172a;
        border: 1px solid rgba(148, 163, 184, 0.15);
        border-radius: 8px;
        padding: 12px;
        margin-bottom: 8px;
        cursor: grab;
        font-family: 'Plus Jakarta Sans', sans-serif;
      }
      .task-card:hover {
        border-color: var(--tp-primary, #6366f1);
      }
      h4 {
        margin: 8px 0 6px;
        font-size: 13px;
        color: #f1f5f9;
      }
      .meta {
        display: flex;
        gap: 4px;
      }
      .tag {
        font-size: 10px;
        padding: 2px 6px;
        background: rgba(99, 102, 241, 0.1);
        color: #818cf8;
        border-radius: 4px;
      }
    `,
  ],
})
export class TaskCardComponent {
  @Input({ required: true }) task!: Task;
  selected = output<string>();
}
