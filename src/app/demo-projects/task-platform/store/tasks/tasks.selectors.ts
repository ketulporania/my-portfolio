import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TpTasksState, selectAllTasks } from './tasks.reducer';
import { Task } from '../../core/services/task.service';

export const selectTpTasksState = createFeatureSelector<TpTasksState>('tp_tasks');
export const selectTpTasks = createSelector(selectTpTasksState, selectAllTasks);
export const selectTpTasksLoading = createSelector(selectTpTasksState, (s) => s.loading);

export const selectTasksByStatus = (status: Task['status']) =>
  createSelector(selectTpTasks, (tasks) =>
    tasks.filter((t) => t.status === status).sort((a, b) => a.order - b.order)
  );

export const selectTpTodoTasks = selectTasksByStatus('todo');
export const selectTpInProgressTasks = selectTasksByStatus('in-progress');
export const selectTpInReviewTasks = selectTasksByStatus('in-review');
export const selectTpDoneTasks = selectTasksByStatus('done');
