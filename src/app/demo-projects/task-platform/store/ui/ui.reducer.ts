import { createReducer, on } from '@ngrx/store';
import * as UiActions from './ui.actions';

export interface TpUiState {
  taskModalOpen: boolean;
  selectedTaskId: string | null;
  sidebarCollapsed: boolean;
}

export const initialState: TpUiState = {
  taskModalOpen: false,
  selectedTaskId: null,
  sidebarCollapsed: false,
};

export const tpUiReducer = createReducer(
  initialState,
  on(UiActions.openTaskModal, (s) => ({ ...s, taskModalOpen: true })),
  on(UiActions.closeTaskModal, (s) => ({ ...s, taskModalOpen: false })),
  on(UiActions.openTaskDetail, (s, { taskId }) => ({ ...s, selectedTaskId: taskId })),
  on(UiActions.closeTaskDetail, (s) => ({ ...s, selectedTaskId: null })),
  on(UiActions.toggleSidebar, (s) => ({ ...s, sidebarCollapsed: !s.sidebarCollapsed }))
);
