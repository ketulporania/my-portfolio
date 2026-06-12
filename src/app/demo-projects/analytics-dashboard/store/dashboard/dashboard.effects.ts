import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, forkJoin, map, mergeMap, of, switchMap, takeUntil, tap } from 'rxjs';
import { DataStreamService } from '../../core/services/data-stream.service';
import * as DashboardActions from './dashboard.actions';

@Injectable()
export class AdDashboardEffects {
  private actions$ = inject(Actions);
  private dataStream = inject(DataStreamService);
  private store = inject(Store);

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadDashboard),
      mergeMap(() =>
        forkJoin({
          metrics: this.dataStream.loadMetrics(),
          activity: this.dataStream.loadActivityFeed(),
          charts: this.dataStream.loadChartSeries(),
        }).pipe(
          map(({ metrics, activity, charts }) =>
            DashboardActions.loadDashboardSuccess({ metrics, activity, charts })
          ),
          catchError((err) =>
            of(DashboardActions.loadDashboardFailure({ error: err.message ?? 'Failed to load dashboard' }))
          )
        )
      )
    )
  );

  stream$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.startStream),
      switchMap(() =>
        this.dataStream.loadMetrics().pipe(
          switchMap((baseMetrics) =>
            this.dataStream.streamMetrics(baseMetrics).pipe(
              map((metrics) => DashboardActions.updateMetrics({ metrics })),
              takeUntil(this.actions$.pipe(ofType(DashboardActions.stopStream)))
            )
          )
        )
      )
    )
  );

  activityStream$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.startStream),
      switchMap(() =>
        this.dataStream.loadActivityFeed().pipe(
          switchMap((base) =>
            this.dataStream.streamActivity(base).pipe(
              map((activity) => DashboardActions.updateActivity({ activity })),
              takeUntil(this.actions$.pipe(ofType(DashboardActions.stopStream)))
            )
          )
        )
      )
    )
  );
}
