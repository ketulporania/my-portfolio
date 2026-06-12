import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdDashboardState } from './dashboard.reducer';

export const selectAdDashboardState = createFeatureSelector<AdDashboardState>('ad_dashboard');

export const selectAdMetrics = createSelector(selectAdDashboardState, (s) => s.metrics);
export const selectAdActivity = createSelector(selectAdDashboardState, (s) => s.activity);
export const selectAdCharts = createSelector(selectAdDashboardState, (s) => s.charts);
export const selectAdDashboardLoading = createSelector(selectAdDashboardState, (s) => s.loading);
export const selectAdDashboardError = createSelector(selectAdDashboardState, (s) => s.error);
export const selectAdStreaming = createSelector(selectAdDashboardState, (s) => s.streaming);
