import { createAction, props } from '@ngrx/store';
import { Task } from '../../core/services/task.service';

export const loadTasks = createAction('[TP Tasks] Load');
export const loadTasksSuccess = createAction('[TP Tasks] Load Success', props<{ tasks: Task[] }>());
export const loadTasksFailure = createAction('[TP Tasks] Load Failure', props<{ error: string }>());
export const moveTask = createAction(
  '[TP Tasks] Move',
  props<{ taskId: string; status: Task['status']; order: number }>()
);
export const moveTaskOptimistic = createAction(
  '[TP Tasks] Move Optimistic',
  props<{ taskId: string; status: Task['status']; order: number; previousStatus: Task['status']; previousOrder: number }>()
);
export const moveTaskRollback = createAction(
  '[TP Tasks] Move Rollback',
  props<{ taskId: string; status: Task['status']; order: number }>()
);
export const addTask = createAction('[TP Tasks] Add', props<{ task: Task }>());
export const updateTask = createAction('[TP Tasks] Update', props<{ task: Task }>());
