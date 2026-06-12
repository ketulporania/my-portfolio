import { createReducer, on } from '@ngrx/store';
import { AdUser } from '../../core/services/auth.service';
import * as AuthActions from './auth.actions';

export interface AdAuthState {
  user: AdUser | null;
  loading: boolean;
  error: string | null;
}

export const initialState: AdAuthState = {
  user: null,
  loading: false,
  error: null,
};

export const adAuthReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({ ...state, loading: true, error: null })),
  on(AuthActions.loginSuccess, (state, { user }) => ({ ...state, user, loading: false })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(AuthActions.logout, () => initialState),
  on(AuthActions.restoreSession, (state, { user }) => ({ ...state, user }))
);
