import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TpAuthState } from './tp-auth.reducer';

export const selectTpAuthState = createFeatureSelector<TpAuthState>('tp_auth');
export const selectTpUser = createSelector(selectTpAuthState, (s) => s.user);
export const selectTpAuthLoading = createSelector(selectTpAuthState, (s) => s.loading);
export const selectTpAuthError = createSelector(selectTpAuthState, (s) => s.error);
export const selectTpRole = createSelector(selectTpAuthState, (s) => s.user?.role);
