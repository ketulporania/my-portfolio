import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { Task } from '../../../../core/services/task.service';
import { TaskCardComponent } from '../task-card/task-card.component';
import { moveTask } from '../../../../store/tasks/tasks.actions';
import { openTaskDetail } from '../../../../store/ui/ui.actions';

@Component({
  selector: 'tp-kanban-column',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DragDropModule, TaskCardComponent],
  template: `
    <div class="column">
      <header>
        <h3>{{ title }}</h3>
        <span class="count">{{ tasks.length }}</span>
      </header>
      <div
        cdkDropList
        [id]="status"
        [cdkDropListData]="tasks"
        [cdkDropListConnectedTo]="connectedTo"
        (cdkDropListDropped)="onDrop($event)"
        class="list">
        @for (task of tasks; track task.id) {
          <div cdkDrag [cdkDragData]="task">
            <tp-task-card [task]="task" (selected)="onSelect($event)" />
          </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .column {
        flex: 1;
        min-width: 240px;
        background: #1e293b;
        border-radius: 12px;
        padding: 16px;
        font-family: 'Plus Jakarta Sans', sans-serif;
      }
      header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;
      }
      h3 {
        margin: 0;
        font-size: 13px;
        color: #94a3b8;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .count {
        background: rgba(148, 163, 184, 0.15);
        color: #94a3b8;
        font-size: 11px;
        padding: 2px 8px;
        border-radius: 9999px;
      }
      .list {
        min-height: 200px;
      }
      .cdk-drag-preview {
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
      }

      @media (max-width: 768px) {
        .column {
          min-width: 280px;
          flex: 0 0 280px;
        }
      }
    `,
  ],
})
export class KanbanColumnComponent {
  private store = inject(Store);

  @Input({ required: true }) title!: string;
  @Input({ required: true }) status!: Task['status'];
  @Input({ required: true }) tasks: Task[] = [];
  @Input() connectedTo: string[] = [];

  onDrop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    const task = event.container.data[event.currentIndex];
    if (task) {
      this.store.dispatch(
        moveTask({ taskId: task.id, status: this.status, order: event.currentIndex })
      );
    }
  }

  onSelect(taskId: string): void {
    this.store.dispatch(openTaskDetail({ taskId }));
  }
}
