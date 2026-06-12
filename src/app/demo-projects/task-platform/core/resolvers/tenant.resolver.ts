import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Tenant, TenantService } from '../services/tenant.service';
import { TpAuthService } from '../services/tp-auth.service';

export const tenantResolver: ResolveFn<Tenant | null> = () => {
  const tenantService = inject(TenantService);
  const auth = inject(TpAuthService);
  const user = auth.getCurrentUser();
  if (!user) return of(null);

  const existing = tenantService.getTenant();
  if (existing) return of(existing);

  return tenantService.loadTenants().pipe(
    map((tenants) => tenants.find((t) => t.id === user.tenantId) ?? tenants[0] ?? null),
    map((tenant) => {
      if (tenant) tenantService.setTenant(tenant);
      return tenant;
    }),
    take(1)
  );
};
