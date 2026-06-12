import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Task } from '../../core/services/task.service';
import * as TaskActions from './tasks.actions';

export interface TpTasksState extends EntityState<Task> {
  loading: boolean;
  error: string | null;
}

export const tasksAdapter = createEntityAdapter<Task>();

export const initialState: TpTasksState = tasksAdapter.getInitialState({
  loading: false,
  error: null,
});

export const tpTasksReducer = createReducer(
  initialState,
  on(TaskActions.loadTasks, (s) => ({ ...s, loading: true })),
  on(TaskActions.loadTasksSuccess, (s, { tasks }) =>
    tasksAdapter.setAll(tasks, { ...s, loading: false })
  ),
  on(TaskActions.loadTasksFailure, (s, { error }) => ({ ...s, loading: false, error })),
  on(TaskActions.moveTaskOptimistic, (s, { taskId, status, order }) =>
    tasksAdapter.updateOne({ id: taskId, changes: { status, order } }, s)
  ),
  on(TaskActions.moveTaskRollback, (s, { taskId, status, order }) =>
    tasksAdapter.updateOne({ id: taskId, changes: { status, order } }, s)
  ),
  on(TaskActions.addTask, (s, { task }) => tasksAdapter.addOne(task, s)),
  on(TaskActions.updateTask, (s, { task }) => tasksAdapter.upsertOne(task, s))
);

export const { selectAll: selectAllTasks, selectEntities: selectTaskEntities } =
  tasksAdapter.getSelectors();
