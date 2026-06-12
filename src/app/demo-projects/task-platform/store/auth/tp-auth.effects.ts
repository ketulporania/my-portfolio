import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { TpAuthService } from '../../core/services/tp-auth.service';
import { TenantService } from '../../core/services/tenant.service';
import * as AuthActions from './tp-auth.actions';

@Injectable()
export class TpAuthEffects {
  private actions$ = inject(Actions);
  private auth = inject(TpAuthService);
  private tenant = inject(TenantService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.tpLogin),
      exhaustMap(({ email, password }) =>
        this.auth.login(email, password).pipe(
          map((session) => AuthActions.tpLoginSuccess({ session })),
          catchError((err) => of(AuthActions.tpLoginFailure({ error: err.message ?? 'Login failed' })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.tpLoginSuccess),
        exhaustMap(({ session }) =>
          this.tenant.loadTenants().pipe(
            tap((tenants) => {
              const t = tenants.find((x) => x.id === session.user.tenantId) ?? tenants[0];
              if (t) this.tenant.setTenant(t);
              this.router.navigate(['/projects/task-platform/board']);
            })
          )
        )
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.tpLogout),
        tap(() => {
          this.auth.logout();
          this.router.navigate(['/projects/task-platform/login']);
        })
      ),
    { dispatch: false }
  );
}
