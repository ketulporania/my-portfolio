import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TpUiState } from './ui.reducer';

export const selectTpUiState = createFeatureSelector<TpUiState>('tp_ui');
export const selectTpTaskModalOpen = createSelector(selectTpUiState, (s) => s.taskModalOpen);
export const selectTpSelectedTaskId = createSelector(selectTpUiState, (s) => s.selectedTaskId);
export const selectTpSidebarCollapsed = createSelector(selectTpUiState, (s) => s.sidebarCollapsed);
