import { createAction, props } from '@ngrx/store';
import { Project } from '../../core/services/task.service';

export const loadProjects = createAction('[TP Projects] Load');
export const loadProjectsSuccess = createAction('[TP Projects] Load Success', props<{ projects: Project[] }>());
export const selectProject = createAction('[TP Projects] Select', props<{ projectId: string }>());
