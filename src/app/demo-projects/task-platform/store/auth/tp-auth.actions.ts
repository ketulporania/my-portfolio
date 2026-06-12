import { createAction, props } from '@ngrx/store';
import { TpSession, TpUser } from '../../core/services/tp-auth.service';

export const tpLogin = createAction('[TP Auth] Login', props<{ email: string; password: string }>());
export const tpLoginSuccess = createAction('[TP Auth] Login Success', props<{ session: TpSession }>());
export const tpLoginFailure = createAction('[TP Auth] Login Failure', props<{ error: string }>());
export const tpLogout = createAction('[TP Auth] Logout');
export const tpRestoreSession = createAction('[TP Auth] Restore Session', props<{ user: TpUser }>());
