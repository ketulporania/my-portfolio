import { createReducer, on } from '@ngrx/store';
import { Project } from '../../core/services/task.service';
import * as ProjectActions from './projects.actions';

export interface TpProjectsState {
  projects: Project[];
  selectedProjectId: string | null;
  loading: boolean;
}

export const initialState: TpProjectsState = {
  projects: [],
  selectedProjectId: null,
  loading: false,
};

export const tpProjectsReducer = createReducer(
  initialState,
  on(ProjectActions.loadProjects, (s) => ({ ...s, loading: true })),
  on(ProjectActions.loadProjectsSuccess, (s, { projects }) => ({
    ...s,
    projects,
    selectedProjectId: projects[0]?.id ?? null,
    loading: false,
  })),
  on(ProjectActions.selectProject, (s, { projectId }) => ({ ...s, selectedProjectId: projectId }))
);
