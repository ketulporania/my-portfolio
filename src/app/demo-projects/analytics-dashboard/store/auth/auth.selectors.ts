import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdAuthState } from './auth.reducer';

export const selectAdAuthState = createFeatureSelector<AdAuthState>('ad_auth');

export const selectAdUser = createSelector(selectAdAuthState, (s) => s.user);
export const selectAdAuthLoading = createSelector(selectAdAuthState, (s) => s.loading);
export const selectAdAuthError = createSelector(selectAdAuthState, (s) => s.error);
export const selectAdIsAuthenticated = createSelector(selectAdAuthState, (s) => !!s.user);
