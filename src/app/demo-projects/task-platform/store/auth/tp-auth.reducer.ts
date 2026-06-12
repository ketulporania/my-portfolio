import { createReducer, on } from '@ngrx/store';
import { TpUser } from '../../core/services/tp-auth.service';
import * as AuthActions from './tp-auth.actions';

export interface TpAuthState {
  user: TpUser | null;
  loading: boolean;
  error: string | null;
}

export const initialState: TpAuthState = { user: null, loading: false, error: null };

export const tpAuthReducer = createReducer(
  initialState,
  on(AuthActions.tpLogin, (s) => ({ ...s, loading: true, error: null })),
  on(AuthActions.tpLoginSuccess, (s, { session }) => ({ ...s, user: session.user, loading: false })),
  on(AuthActions.tpLoginFailure, (s, { error }) => ({ ...s, loading: false, error })),
  on(AuthActions.tpLogout, () => initialState),
  on(AuthActions.tpRestoreSession, (s, { user }) => ({ ...s, user }))
);
