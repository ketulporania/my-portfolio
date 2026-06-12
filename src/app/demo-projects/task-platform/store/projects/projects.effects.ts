import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { TaskService } from '../../core/services/task.service';
import * as ProjectActions from './projects.actions';

@Injectable()
export class TpProjectEffects {
  private actions$ = inject(Actions);
  private tasks = inject(TaskService);

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.loadProjects),
      mergeMap(() =>
        this.tasks.loadProjects().pipe(
          map((projects) => ProjectActions.loadProjectsSuccess({ projects }))
        )
      )
    )
  );
}
