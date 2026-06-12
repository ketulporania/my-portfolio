import { createReducer, on } from '@ngrx/store';
import { ActivityItem, ChartSeries, KpiMetric } from '../../core/services/data-stream.service';
import * as DashboardActions from './dashboard.actions';

export interface AdDashboardState {
  metrics: KpiMetric[];
  activity: ActivityItem[];
  charts: ChartSeries | null;
  loading: boolean;
  error: string | null;
  streaming: boolean;
}

export const initialState: AdDashboardState = {
  metrics: [],
  activity: [],
  charts: null,
  loading: false,
  error: null,
  streaming: false,
};

export const adDashboardReducer = createReducer(
  initialState,
  on(DashboardActions.loadDashboard, (state) => ({ ...state, loading: true, error: null })),
  on(DashboardActions.loadDashboardSuccess, (state, { metrics, activity, charts }) => ({
    ...state,
    metrics,
    activity,
    charts,
    loading: false,
  })),
  on(DashboardActions.loadDashboardFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(DashboardActions.updateMetrics, (state, { metrics }) => ({ ...state, metrics })),
  on(DashboardActions.updateActivity, (state, { activity }) => ({ ...state, activity })),
  on(DashboardActions.startStream, (state) => ({ ...state, streaming: true })),
  on(DashboardActions.stopStream, (state) => ({ ...state, streaming: false }))
);
