import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { TaskService } from '../../core/services/task.service';
import { NotificationService } from '../../core/services/notification.service';
import * as TaskActions from './tasks.actions';

@Injectable()
export class TpTaskEffects {
  private actions$ = inject(Actions);
  private tasks = inject(TaskService);
  private notify = inject(NotificationService);

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      mergeMap(() =>
        this.tasks.loadTasks().pipe(
          map((tasks) => TaskActions.loadTasksSuccess({ tasks })),
          catchError((err) => of(TaskActions.loadTasksFailure({ error: err.message })))
        )
      )
    )
  );

  move$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.moveTask),
      map(({ taskId, status, order }) => TaskActions.moveTaskOptimistic({ taskId, status, order, previousStatus: status, previousOrder: order }))
    )
  );

  moveSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TaskActions.moveTaskOptimistic),
        tap(() => this.notify.show('Task moved successfully', 'success'))
      ),
    { dispatch: false }
  );
}
