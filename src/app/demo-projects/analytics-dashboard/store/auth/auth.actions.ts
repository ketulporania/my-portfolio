import { createAction, props } from '@ngrx/store';
import { AdUser } from '../../core/services/auth.service';

export const login = createAction('[AD Auth] Login', props<{ email: string; password: string }>());
export const loginSuccess = createAction('[AD Auth] Login Success', props<{ user: AdUser }>());
export const loginFailure = createAction('[AD Auth] Login Failure', props<{ error: string }>());
export const logout = createAction('[AD Auth] Logout');
export const restoreSession = createAction('[AD Auth] Restore Session', props<{ user: AdUser }>());
