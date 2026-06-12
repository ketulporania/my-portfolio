import { createAction, props } from '@ngrx/store';
import { ActivityItem, ChartSeries, KpiMetric } from '../../core/services/data-stream.service';

export const loadDashboard = createAction('[AD Dashboard] Load');
export const loadDashboardSuccess = createAction(
  '[AD Dashboard] Load Success',
  props<{ metrics: KpiMetric[]; activity: ActivityItem[]; charts: ChartSeries }>()
);
export const loadDashboardFailure = createAction('[AD Dashboard] Load Failure', props<{ error: string }>());
export const updateMetrics = createAction('[AD Dashboard] Update Metrics', props<{ metrics: KpiMetric[] }>());
export const updateActivity = createAction('[AD Dashboard] Update Activity', props<{ activity: ActivityItem[] }>());
export const startStream = createAction('[AD Dashboard] Start Stream');
export const stopStream = createAction('[AD Dashboard] Stop Stream');
