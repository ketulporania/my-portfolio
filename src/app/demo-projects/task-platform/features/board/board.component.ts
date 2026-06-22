import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { TpSidebarComponent } from '../../shared/components/sidebar/tp-sidebar.component';
import { TopbarComponent } from '../../shared/components/topbar/topbar.component';
import { KanbanColumnComponent } from './components/kanban-column/kanban-column.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { AddTaskModalComponent } from './components/add-task-modal/add-task-modal.component';
import {
  selectTpDoneTasks,
  selectTpInProgressTasks,
  selectTpInReviewTasks,
  selectTpTodoTasks,
  selectTpTasks,
} from '../../store/tasks/tasks.selectors';
import { loadTasks } from '../../store/tasks/tasks.actions';
import { loadProjects } from '../../store/projects/projects.actions';
import {
  selectTpSelectedTaskId,
  selectTpTaskModalOpen,
} from '../../store/ui/ui.selectors';
import { closeTaskDetail, openTaskModal } from '../../store/ui/ui.actions';
import { selectTpUser } from '../../store/auth/tp-auth.selectors';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'tp-board',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    TpSidebarComponent,
    TopbarComponent,
    KanbanColumnComponent,
    TaskDetailComponent,
    AddTaskModalComponent,
  ],
  template: `
    <div class="tp-app">
      <tp-sidebar />
      <div class="content">
        <tp-topbar />
        <div class="board-header">
          <h2>Kanban Board</h2>
          @if ((user$ | async)?.role !== 'viewer') {
            <button type="button" class="add-btn" (click)="openAdd()">+ Add Task</button>
          }
        </div>
        <div class="board">
          <tp-kanban-column
            title="To Do"
            status="todo"
            [tasks]="(todo$ | async) ?? []"
            [connectedTo]="['in-progress', 'in-review', 'done']" />
          <tp-kanban-column
            title="In Progress"
            status="in-progress"
            [tasks]="(inProgress$ | async) ?? []"
            [connectedTo]="['todo', 'in-review', 'done']" />
          <tp-kanban-column
            title="In Review"
            status="in-review"
            [tasks]="(inReview$ | async) ?? []"
            [connectedTo]="['todo', 'in-progress', 'done']" />
          <tp-kanban-column
            title="Done"
            status="done"
            [tasks]="(done$ | async) ?? []"
            [connectedTo]="['todo', 'in-progress', 'in-review']" />
        </div>
      </div>
      @if (selectedTask$ | async; as task) {
        <tp-task-detail [task]="task" (closed)="closeDetail()" />
      }
      @if (modalOpen$ | async) {
        <tp-add-task-modal />
      }
    </div>
  `,
  styles: [
    `
      .tp-app {
        display: flex;
        min-height: calc(100vh - 44px);
        background: #0a0e1a;
        color: #f1f5f9;
      }
      .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      .board-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 16px 24px;
        font-family: 'Plus Jakarta Sans', sans-serif;
      }
      h2 {
        margin: 0;
        font-size: 18px;
      }
      .add-btn {
        background: var(--tp-primary, #6366f1);
        color: #fff;
        border: none;
        padding: 8px 16px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 13px;
        white-space: nowrap;
        flex-shrink: 0;
      }
      .board {
        display: flex;
        gap: 16px;
        padding: 0 24px 24px;
        overflow-x: auto;
        flex: 1;
        -webkit-overflow-scrolling: touch;
      }

      @media (max-width: 768px) {
        .board-header {
          padding: 12px 16px;
        }

        .board {
          padding: 0 16px 16px;
          gap: 12px;
        }

        h2 {
          font-size: 16px;
        }
      }
    `,
  ],
})
export class BoardComponent implements OnInit {
  private store = inject(Store);

  todo$ = this.store.select(selectTpTodoTasks);
  inProgress$ = this.store.select(selectTpInProgressTasks);
  inReview$ = this.store.select(selectTpInReviewTasks);
  done$ = this.store.select(selectTpDoneTasks);
  user$ = this.store.select(selectTpUser);
  modalOpen$ = this.store.select(selectTpTaskModalOpen);

  selectedTask$ = combineLatest([
    this.store.select(selectTpTasks),
    this.store.select(selectTpSelectedTaskId),
  ]).pipe(map(([tasks, id]) => (id ? tasks.find((t) => t.id === id) ?? null : null)));

  ngOnInit(): void {
    this.store.dispatch(loadTasks());
    this.store.dispatch(loadProjects());
  }

  openAdd(): void {
    this.store.dispatch(openTaskModal());
  }

  closeDetail(): void {
    this.store.dispatch(closeTaskDetail());
  }
}
