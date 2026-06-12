import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { TpAuthService } from '../services/tp-auth.service';

export const tpAuthGuard: CanActivateFn = () => {
  const auth = inject(TpAuthService);
  const router = inject(Router);
  if (auth.isAuthenticated()) return true;
  return router.createUrlTree(['/projects/task-platform/login']);
};

export const roleGuard =
  (roles: string[]): CanActivateFn =>
  (route) => {
    const auth = inject(TpAuthService);
    const router = inject(Router);
    const notify = inject(NotificationService);
    const user = auth.getCurrentUser();
    if (user && roles.includes(user.role)) return true;

    const section = (route.data?.['sectionName'] as string) ?? 'this section';
    notify.show(`You do not have permission to access ${section}.`, 'error');
    return router.createUrlTree(['/projects/task-platform/board']);
  };
