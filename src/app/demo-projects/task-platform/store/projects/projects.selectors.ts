import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TpProjectsState } from './projects.reducer';

export const selectTpProjectsState = createFeatureSelector<TpProjectsState>('tp_projects');
export const selectTpProjects = createSelector(selectTpProjectsState, (s) => s.projects);
export const selectTpSelectedProjectId = createSelector(selectTpProjectsState, (s) => s.selectedProjectId);
export const selectTpSelectedProject = createSelector(selectTpProjectsState, (s) =>
  s.projects.find((p) => p.id === s.selectedProjectId) ?? null
);
