import { createAction, props } from '@ngrx/store';

export const openTaskModal = createAction('[TP UI] Open Task Modal');
export const closeTaskModal = createAction('[TP UI] Close Task Modal');
export const openTaskDetail = createAction('[TP UI] Open Task Detail', props<{ taskId: string }>());
export const closeTaskDetail = createAction('[TP UI] Close Task Detail');
export const toggleSidebar = createAction('[TP UI] Toggle Sidebar');
export const closeSidebar = createAction('[TP UI] Close Sidebar');
