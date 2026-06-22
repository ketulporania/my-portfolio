import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addTask } from '../../../../store/tasks/tasks.actions';
import { closeTaskModal } from '../../../../store/ui/ui.actions';
import { TpAuthService } from '../../../../core/services/tp-auth.service';
import { Task } from '../../../../core/services/task.service';

@Component({
  selector: 'tp-add-task-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: `
    <div class="overlay" (click)="onClose()">
      <div class="modal" (click)="$event.stopPropagation()">
        <h3>Add New Task</h3>
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <input formControlName="title" placeholder="Task title" />
          <textarea formControlName="description" placeholder="Description" rows="3"></textarea>
          <select formControlName="priority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div class="actions">
            <button type="button" (click)="onClose()">Cancel</button>
            <button type="submit" [disabled]="form.invalid">Add Task</button>
          </div>
        </form>
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
      }
      .modal {
        background: #1e293b;
        border-radius: 12px;
        padding: 24px;
        width: min(400px, calc(100vw - 32px));
        max-height: calc(100vh - 32px);
        overflow-y: auto;
        font-family: 'Plus Jakarta Sans', sans-serif;
      }
      h3 {
        margin: 0 0 16px;
        color: #f1f5f9;
      }
      input,
      textarea,
      select {
        width: 100%;
        padding: 10px;
        margin-bottom: 12px;
        background: #0f172a;
        border: 1px solid rgba(148, 163, 184, 0.2);
        border-radius: 8px;
        color: #f1f5f9;
        box-sizing: border-box;
      }
      .actions {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
      }
      button {
        padding: 8px 16px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 13px;
      }
      button[type='submit'] {
        background: var(--tp-primary, #6366f1);
        color: #fff;
        border: none;
      }
      button[type='button'] {
        background: transparent;
        border: 1px solid rgba(148, 163, 184, 0.3);
        color: #94a3b8;
      }
    `,
  ],
})
export class AddTaskModalComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private auth = inject(TpAuthService);

  closed = output<void>();

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: [''],
    priority: ['medium' as const],
  });

  onClose(): void {
    this.store.dispatch(closeTaskModal());
    this.closed.emit();
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const user = this.auth.getCurrentUser();
    const { title, description, priority } = this.form.getRawValue();
    const task: Task = {
      id: `t${Date.now()}`,
      title,
      description,
      status: 'todo',
      priority,
      projectId: 'p1',
      assigneeIds: user ? [user.id] : [],
      dueDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
      createdAt: new Date().toISOString().slice(0, 10),
      order: 0,
      tenantId: user?.tenantId ?? 'acme',
      commentCount: 0,
      tags: [],
    };
    this.store.dispatch(addTask({ task }));
    this.onClose();
  }
}
