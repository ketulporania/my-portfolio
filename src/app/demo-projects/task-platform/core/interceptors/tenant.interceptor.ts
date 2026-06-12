import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TenantService } from '../services/tenant.service';

export const tenantInterceptor: HttpInterceptorFn = (req, next) => {
  const tenantService = inject(TenantService);
  const tenant = tenantService.getTenant();
  if (tenant && req.url.includes('/api/')) {
    return next(req.clone({ setHeaders: { 'X-Tenant-ID': tenant.id } }));
  }
  return next(req);
};
